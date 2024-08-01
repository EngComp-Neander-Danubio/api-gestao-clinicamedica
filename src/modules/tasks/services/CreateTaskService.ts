import { dataSource } from "../../../shared/typeorm/index";
import { TaskRepository } from "../typeorm/repositories/TaskRepository";
import AppError from "@shared/http/errors/AppError";
import Task from "../typeorm/entities/Task";
import User from "@modules/users/typeorm/entities/User";
import UserRepository from "@modules/users/typeorm/repositories/UserRepository";

interface IRequest {
  name: string;
  name_task: string;
  status: string;
  priority: string;
  dateBegin: Date;
  dateFinish: Date;
  userId: string;
}

export class CreateTaskService {
  public async execute({ name, name_task, status, priority, dateBegin, dateFinish, userId }: IRequest): Promise<Task> {
    const tasksRepository = dataSource.getRepository(Task);
    const usersRepository = dataSource.getRepository(User);

    const taskExists = await TaskRepository.findByName(tasksRepository, name_task);
    const userExists = await UserRepository.findById(usersRepository, userId);
    if (taskExists) {
      throw new AppError("Task is already defined");
    }
    if (!userExists) {
      throw new AppError("User isn't defined");
    }

    const task = tasksRepository.create({
      name_task,
      name,
      status,
      priority,
      dateBegin,
      dateFinish,
    });
    task.user = userExists;
    await tasksRepository.save(task);

    return task;
  }
}
