
import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Specialty from "../typeorm/entities/Specialty";
import { SpecialtyRepository } from "../typeorm/repository/SpecialtyRepository";
interface IRequest {
  id: string;
}
export class ShowSpecialtyService {
  public async execute({ id }: IRequest): Promise<Specialty | undefined> {
    const tasksRepository = dataSource.getRepository(Specialty);

    const singleSpecialty = await tasksRepository.findOne({
      where: { id },
    });

    if (!singleSpecialty) {
      throw new AppError('Task not found');
    }

    return singleSpecialty;
  }
}
