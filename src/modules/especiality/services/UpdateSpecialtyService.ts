import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Specialty from "../typeorm/entities/Specialty";
import { SpecialtyRepository } from "../typeorm/repository/SpecialtyRepository";

interface IRequest {
  id: string;
  name_specialty: string;
}

export class UpdateSpecialtyService {
  public async execute({ id, name_specialty }: IRequest): Promise<Specialty | undefined> {
    const specialtiesRepository = dataSource.getRepository(Specialty);
    const singleSpecialty = await specialtiesRepository.findOne({
      where: { id },
    });

    if (!singleSpecialty) {
      throw new AppError('Specialty not found');
    }
    const specialtyExists = await SpecialtyRepository.findByName(specialtiesRepository, name_specialty)
    if (specialtyExists && name_specialty !== singleSpecialty.name_specialty) {
      throw new AppError("Specialty is already defined");
    }
    singleSpecialty.name_specialty = name_specialty;

    await specialtiesRepository.save(singleSpecialty);
    return singleSpecialty;
  }
}
