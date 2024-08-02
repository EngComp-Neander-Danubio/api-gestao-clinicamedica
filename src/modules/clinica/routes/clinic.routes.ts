import { Router } from "express";


const clinicsRoutes = Router();
const clinicsController = new ClinicsController();

clinicsRoutes.get('/', clinicsController.index);
clinicsRoutes.get('/:id', clinicsController.show);
clinicsRoutes.post('/', clinicsController.create);
clinicsRoutes.put('/:id', clinicsController.update);
clinicsRoutes.delete('/:id', clinicsController.delete);

export default clinicsRoutes;