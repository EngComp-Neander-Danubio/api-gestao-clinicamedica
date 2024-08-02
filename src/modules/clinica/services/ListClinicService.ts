import { dataSource } from "@shared/typeorm";
import Clinic from "../typeorm/entities/Clinic";

export class ListClinicService {
  public async execute(): Promise<Clinic[] | null> {
    const clinicsRepository = dataSource.getRepository(Clinic)
    const clinic = await clinicsRepository.find()

    return clinic;
  }
}