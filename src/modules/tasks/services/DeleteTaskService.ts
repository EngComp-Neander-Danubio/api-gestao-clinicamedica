import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Task from "../typeorm/entities/Task";

interface IRequest {
  id: string;
}

export class DeleteTaskService {
  public async execute({ id }: IRequest): Promise<void> {
    const tasksRepository = dataSource.getRepository(Task);

    const task = await tasksRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new AppError('Task not found');
    }

    await tasksRepository.remove(task);
  }
}
