
import { dataSource } from "../../../shared/typeorm";
import Specialty from "../typeorm/entities/Specialty";

export class ListSpecialtyService {
  public async execute(): Promise<Specialty[]> {
    const SpecialtiesRepository = dataSource.getRepository(Specialty);

    const Specialties = await SpecialtiesRepository.find();

    return Specialties;
  }
}
