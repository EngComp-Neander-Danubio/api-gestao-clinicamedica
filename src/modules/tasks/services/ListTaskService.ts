import User from "@modules/users/typeorm/entities/User";
import { dataSource } from "../../../shared/typeorm";
import Task from "../typeorm/entities/Task";

export class ListTaskService {
  public async execute(): Promise<Task[]> {
    const tasksRepository = dataSource.getRepository(Task);

    const tasks = await tasksRepository.find();

    return tasks;
  }
}
