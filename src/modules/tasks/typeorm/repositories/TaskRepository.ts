import { Repository } from 'typeorm';
import Task from '../entities/Task';

export class TaskRepository extends Repository<Task> {
  public static async findByName(repository: Repository<Task>, name: string): Promise<Task | null> {
    const task = await repository.findOne({
      where: {
        name_task: name,
      },
    });
    return task;
  }
}
