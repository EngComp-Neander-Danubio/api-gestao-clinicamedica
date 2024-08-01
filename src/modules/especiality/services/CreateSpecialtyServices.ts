import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
import Specialty from "../typeorm/entities/Specialty";
import { SpecialtyRepository } from "../typeorm/repository/SpecialtyRepository";

interface IRequest {
  name_specialty: string;
}

export class CreateSpecialtyService {
  public async execute({ name_specialty }: IRequest): Promise<Specialty> {
    const specialtiesRepository = dataSource.getRepository(Specialty);
    const singleSpecialtyExists = await SpecialtyRepository.findByName(specialtiesRepository, name_specialty);

    if (singleSpecialtyExists) {
      throw new AppError("Specialty is already defined");
    }

    const specialty = specialtiesRepository.create({
      name_specialty,
    });

    await specialtiesRepository.save(specialty);

    return specialty;
  }
}
