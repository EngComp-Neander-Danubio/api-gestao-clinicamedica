import { Router } from "express";
import { DoctorController } from "../controllers/DoctorController";

const doctorsRoutes = Router();
const doctorsController = new DoctorController();

doctorsRoutes.get('/', doctorsController.index);
doctorsRoutes.get('/:id', doctorsController.show);
doctorsRoutes.post('/', doctorsController.create);
doctorsRoutes.put('/:id', doctorsController.update);
doctorsRoutes.delete('/:id', doctorsController.delete);

export default doctorsRoutes;