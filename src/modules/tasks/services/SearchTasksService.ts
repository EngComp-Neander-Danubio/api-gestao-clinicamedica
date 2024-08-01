import { dataSource } from "../../../shared/typeorm";
import Task from "../typeorm/entities/Task";

interface IRequest {
  query: string
}

export class SearchTasksService {
  public async execute({ query }: IRequest): Promise<Task[]> {
    const searchTasksRepository = dataSource.getRepository(Task);

    const tasks = await searchTasksRepository.createQueryBuilder('task')
      .leftJoinAndSelect("task.user", "user")
      .where('task.name_task ILIKE :name_task', { name_task: `%${query}%` })
      .orWhere('task.priority ILIKE :priority', { priority: `%${query}%` })
      .orWhere('task.name ILIKE :name', { name: `%${query}%` })
      .orWhere('user.name ILIKE :name', { name: `%${query}%` })
      .orWhere('CAST(task.dateBegin AS TEXT) ILIKE :dateBegin', { dateBegin: `%${query}%` })
      .orWhere('CAST(task.dateFinish AS TEXT) ILIKE :dateFinish', { dateFinish: `%${query}%` })
      .orWhere('task.status ILIKE :status', { status: `%${query}%` })
      .select([
        "task.id",
        "task.name_task",
        "task.name",
        "task.status",
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
