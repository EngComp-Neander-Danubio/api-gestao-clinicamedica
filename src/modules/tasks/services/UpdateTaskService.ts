import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Task from "../typeorm/entities/Task";
import { TaskRepository } from "../typeorm/repositories/TaskRepository";

interface IRequest {
  id: string;
  name: string,
  status: string,
  name_task: string;
  priority: string;
  dateBegin: Date;
  dateFinish: Date;
}

export class UpdateTaskService {
  public async execute({ id,name, status, name_task, priority, dateBegin, dateFinish, }: IRequest): Promise<Task | undefined> {
    const tasksRepository = dataSource.getRepository(Task);

    const task = await tasksRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new AppError('Task not found');
    }
    const taskExists = await TaskRepository.findByName(tasksRepository, name_task);
    if (taskExists && name_task !== task.name_task) {
      throw new AppError("Task is already defined");
    }
    task.name_task = name_task;
    task.name = name;
    task.status = status,
    task.priority = priority;
    task.dateBegin = dateBegin;
    task.dateFinish = dateFinish;
    await tasksRepository.save(task);
    return task;
  }
}
