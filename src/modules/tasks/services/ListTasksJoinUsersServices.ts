import User from "@modules/users/typeorm/entities/User";
import { dataSource } from "../../../shared/typeorm";
import Task from "../typeorm/entities/Task";

export class ListTasksJoinUsersService {
  public async execute(): Promise<Task[]> {
    const tasksRepository = dataSource.getRepository(Task);

    const tasks = await tasksRepository
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.user", "user")
      .select([
        "task.id",
        "task.name_task",
        "task.name",
        "task.dateBegin",
        "task.dateFinish",
        "task.priority",
        "task.created_at",
        "task.updated_at",
        "user.name",
        "user.id",
      ])
      .getMany();

    return tasks;
  }
}
