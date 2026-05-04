import { ScheduleDTO } from "../dto/appointment.dto";
import { AppointmentStatus } from "../dto/user-role.enum";
import { Appointment } from "../entities/Appointment.entity";
import { User } from "../entities/User.entity";
import { AppointmentModel } from "../repositories/Appointments.repository";

import { getUserByIdService } from "./users.services";


export const getAppointmentsService = async ():Promise<Appointment[]> => {
  const appointmentsFound = await AppointmentModel.find();
  if(appointmentsFound.length === 0 ) throw new Error("No hay citas disponibles"); 
  return appointmentsFound;
};

export const getAppointmentByidService = async(id:number): Promise<Appointment> => {
    const appointmentFound: Appointment | null = await AppointmentModel.findOneBy({ id });
    if (!appointmentFound) throw new Error(`La cita con id ${id} no fue encontrada`);
    return appointmentFound;
};

export const registerAppointmentService = async(appointment: ScheduleDTO): Promise<Appointment> => {
  
  AppointmentModel.validateAllowAppointment(appointment.date, appointment.time);
  await AppointmentModel.validateExistDate(appointment.userId, appointment.date, appointment.time);

  const userFound: User = await getUserByIdService(appointment.userId);
  
  const [hours, minutes] = appointment.time.split(":").map(Number);
  const appointmentTime = new Date(appointment.date);
  appointmentTime.setUTCHours(hours, minutes, 0, 0);
  const appointmentTimeCol = new Date(appointmentTime.getTime() - 5 * 60 * 60 * 1000);

  const newAppointment: Appointment = AppointmentModel.create({
    date: appointmentTimeCol,
    time: appointment.time,
    subject: appointment.subject,
    user: userFound
  })
  return await AppointmentModel.save(newAppointment);
};

export const cancelAppointmentService = async(id:number): Promise<Appointment> => {
    const appointmenFound: Appointment = await getAppointmentByidService(id);
    appointmenFound.status =  AppointmentStatus.cancelled;
    return  AppointmentModel.save(appointmenFound);
};

