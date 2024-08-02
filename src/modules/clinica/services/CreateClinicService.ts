import { dataSource } from "@shared/typeorm";
import Clinic from "../typeorm/entities/Clinic";
import { ClinicsRepository } from "../typeorm/repository/ClinicsRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
  name_clinica: string;
  address_clinica: string;
  phone: string;
}

export class CreateClinicService {

  public async execute({ name_clinica, address_clinica, phone }: IRequest): Promise<Clinic> {
    const clinicsRepository = dataSource.getRepository(Clinic);
    const clinicExists = await ClinicsRepository.findByName(clinicsRepository, name_clinica);

    if (!clinicExists) {
      throw new AppError('Clinic not found')
    }
    const clinic = clinicsRepository.create({
      name_clinica,
      address_clinica,
      phone,
    })
    await clinicsRepository.save(clinic)
    return clinic;
  }
}