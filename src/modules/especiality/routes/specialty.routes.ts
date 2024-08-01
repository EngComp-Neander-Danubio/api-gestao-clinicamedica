import { Router } from "express";
import { SpecialtysController } from "../controllers/EspecialityController";

const specialtiesRoutes = Router();
const specialtysController = new SpecialtysController();

specialtiesRoutes.get('/', specialtysController.index);
specialtiesRoutes.get('/:id', specialtysController.show);
specialtiesRoutes.post('/', specialtysController.create);
specialtiesRoutes.put('/:id', specialtysController.update);
specialtiesRoutes.delete('/:id', specialtysController.delete);

export default specialtiesRoutes;