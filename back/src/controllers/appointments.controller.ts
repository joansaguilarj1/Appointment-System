import { Request, Response } from "express";
import { ScheduleDTO } from "../dto/appointment.dto";
import { cancelAppointmentService, getAppointmentByidService, getAppointmentsService, registerAppointmentService } from "../services/appointments.service";

export const getAppointmentsController = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      data: await getAppointmentsService(),
      msg: "Todas las citas",
    });
  } catch (error) {
    res.status(404).json({
      msg: error instanceof Error ? error.message: "Error al obtener las citas",
    });
  }
};

export const getAppointmentByIdController = async(req: Request<{ id: string }>, res: Response) => {
  try {
    res.status(200).json({
      data: await getAppointmentByidService(+req.params.id),
      msg: "Cita por id",
    });
  } catch (error) {
    res.status(404).json({
      msg: error instanceof Error ? error.message: "Error al obtener la cita por id",
    });
  }
};

export const scheduleAppointmentController = async(req: Request<unknown, unknown, ScheduleDTO>, res: Response) => {
  try {
    res.status(201).json({
      data: await registerAppointmentService(req.body),
      msg: "Cita registrada con exito",
    });
  } catch (error) {
    res.status(400).json({
      msg: error instanceof Error ? error.message: "Error al registrar la cita",
    });
  }
};

export const cancelAppointmentController = async(req: Request<{ id: string }>, res: Response) => {
  try {
    res.status(200).json({
      data: await cancelAppointmentService(+req.params.id),
      msg: "Cita cancelada con exito",
    });
  } catch (error) {
    res.status(404).json({
      msg: error instanceof Error ? error.message: "Error al cancelar la cita",
    });
  }
};