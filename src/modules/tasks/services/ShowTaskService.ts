import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Task from "../typeorm/entities/Task";

interface IRequest {
  id: string;
}

export class ShowTaskService {
  public async execute({ id }: IRequest): Promise<Task | undefined> {
    const tasksRepository = dataSource.getRepository(Task);

    const task = await tasksRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new AppError('Task not found');
    }

    return task;
  }
}
