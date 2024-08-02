import { dataSource } from "@shared/typeorm";
import Clinic from "../typeorm/entities/Clinic";
import AppError from "@shared/http/errors/AppError";
import { ClinicsRepository } from "../typeorm/repository/ClinicsRepository";
interface IRequest {
  id: string;
}
export class ShowClinicService {
  public static async execute({ id }: IRequest): Promise<Clinic | null> {
    const clinicsRepository = dataSource.getRepository(Clinic);
    const clinic = await ClinicsRepository.findById(clinicsRepository, id)
    if (!clinic) {
      throw new AppError('Clinic not found')
    }
    return clinic
  }
}