import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Specialty from "../typeorm/entities/Specialty";

interface IRequest {
  id: string;
}

export class DeleteSpecialtyService {
  public async execute({ id }: IRequest): Promise<void> {
    const specialtysRepository = dataSource.getRepository(Specialty);

    const specialty = await specialtysRepository.findOne({
      where: { id },
    });

    if (!specialty) {
      throw new AppError('Specialty not found');
    }

    await specialtysRepository.remove(specialty);
  }
}
