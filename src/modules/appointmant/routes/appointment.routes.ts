import { Router } from "express";
import { AppointmentController } from "../controller/AppointmentController";


const appointmentsRoutes = Router();
const appointmentsController = new AppointmentController();

appointmentsRoutes.get('/', appointmentsController.index);
appointmentsRoutes.get('/:id', appointmentsController.show);
appointmentsRoutes.post('/', appointmentsController.create);
appointmentsRoutes.put('/:id', appointmentsController.update);
appointmentsRoutes.delete('/:id', appointmentsController.delete);

export default appointmentsRoutes;