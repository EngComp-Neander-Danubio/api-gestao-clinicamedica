import { Router } from "express";
import { TasksController } from "../controllers/TasksController";

const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.get('/', tasksController.index);
tasksRoutes.get('/joinUsers', tasksController.indexWithJoin);
tasksRoutes.get('/search', tasksController.search);
tasksRoutes.get('/:id', tasksController.show);
tasksRoutes.post('/', tasksController.create);
tasksRoutes.put('/:id', tasksController.update);
tasksRoutes.delete('/:id', tasksController.delete);

export default tasksRoutes;