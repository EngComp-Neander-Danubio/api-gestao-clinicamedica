import { Router } from "express";
import { ClientController } from "../controllers/ClientController";


const clientsRoutes = Router();
const clientsController = new ClientController();

clientsRoutes.get('/', clientsController.index);
clientsRoutes.get('/:id', clientsController.show);
clientsRoutes.post('/', clientsController.create);
clientsRoutes.put('/:id', clientsController.update);
clientsRoutes.delete('/:id', clientsController.delete);

export default clientsRoutes;