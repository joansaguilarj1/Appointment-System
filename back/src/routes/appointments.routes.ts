import { Router, Request, Response } from "express";
import { getAppointmentsController, getAppointmentByIdController, cancelAppointmentController, scheduleAppointmentController } from "../controllers/appointments.controller"
import { ScheduleDTO } from "../dto/appointment.dto";

const appointmentsRouter = Router();

appointmentsRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res));
appointmentsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getAppointmentByIdController(req, res));
appointmentsRouter.post("/schedule",  (req: Request<unknown, unknown, ScheduleDTO>, res: Response) => scheduleAppointmentController(req, res));
appointmentsRouter.put("/cancel/:id",  (req: Request<{ id: string }>, res: Response) => cancelAppointmentController(req, res) );

export default appointmentsRouter;
