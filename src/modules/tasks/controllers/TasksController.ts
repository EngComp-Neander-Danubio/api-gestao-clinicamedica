import { Request, Response } from 'express';
import { ListTaskService } from '../services/ListTaskService';
import { ShowTaskService } from '../services/ShowTaskService';
import { UpdateTaskService } from '../services/UpdateTaskService';
import { DeleteTaskService } from '../services/DeleteTaskService';
import { CreateTaskService } from '../services/CreateTaskService';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListTasksJoinUsersService } from '../services/ListTasksJoinUsersServices';
import { SearchTasksService } from '../services/SearchTasksService';

export class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listTask = new ListTaskService();
      const tasks = await listTask.execute();
      return response.json(tasks);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async indexWithJoin(request: Request, response: Response): Promise<Response> {
    try {
      const listTask = new ListTasksJoinUsersService();
      const tasks = await listTask.execute();
      return response.json(tasks);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async search(request: Request, response: Response): Promise<Response> {
    const { query } = request.query;

    if (typeof query !== 'string') {
      return response.status(400).json({ error: 'Search term must be a string' });
    }
    try {
      const listSearchTasks = new SearchTasksService();
      const tasks = await listSearchTasks.execute({ query });
      return response.json(tasks);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      console.log('entrou aqui no catch', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const showTask = new ShowTaskService();
      const task = await showTask.execute({ id });
      return response.json(task);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, name_task, status, dateBegin, dateFinish, priority, userId } = request.body
    try {
      const createTask = new CreateTaskService();
      const task = await createTask.execute({
        name_task,
        name,
        status,
        dateBegin,
        dateFinish,
        priority,
        userId,
      });
      return response.json(task);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, name_task, status, dateBegin, dateFinish, priority } = request.body
    try {
      const updateTask = new UpdateTaskService();
      const task = await updateTask.execute({
        id,
        name,
        status,
        name_task,
        dateBegin,
        dateFinish,
        priority,
      });
      return response.json(task);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const deleteTask = new DeleteTaskService();
      const task = await deleteTask.execute({
        id,
      });
      return response.json([]);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }

  }
}
