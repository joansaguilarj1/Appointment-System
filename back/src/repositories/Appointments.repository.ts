import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment.entity";
import { AppointmentStatus } from "../dto/user-role.enum";

export const AppointmentModel = AppDataSource.getRepository(Appointment).extend(
  {
    validateAllowAppointment: function (date: Date, time: string): void {
      const [hours, minutes] = time.split(":").map(Number);
      const appointmentTime = new Date(date);
      appointmentTime.setUTCHours(hours, minutes, 0, 0);

      const appointmentTimeCol = new Date(appointmentTime.getTime() - 5 * 60 * 60 * 1000);
      const nowCol = new Date(Date.now() - 5 * 60 * 60 * 1000);
      const dayOfWeek = appointmentTime.getUTCDay();

      if (appointmentTimeCol < nowCol) throw new Error("No se puede crear una cita para fechas pasadas");
      if (dayOfWeek === 0 || dayOfWeek === 6) throw new Error("No se puede crear una cita para fines de semana");
      if (hours < 8 || hours > 17) throw new Error("No se puede agendar citas para antes de las 8am o despues de las 6pm");
      
    },
    validateExistDate: async ( userId: number, date: Date, time: string): Promise<void> => {
      const appointmentFound = await AppointmentModel.findOne({
        where: {
          user: {
            id: userId,
          },
          date: date,
          time: time,
          status: AppointmentStatus.active,
        },
      });
      console.log("date ", date);
       console.log("new Date(date) ", new Date(date));
      if (appointmentFound)
        throw new Error(
          `La cita para el usuario con id ${userId}, fecha ${date} y hora ${time} ya existe`,
        );
    },
  },
);
