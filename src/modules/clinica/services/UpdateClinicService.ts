import { dataSource } from "@shared/typeorm";
import Clinic from "../typeorm/entities/Clinic";
import { ClientRepository } from "@modules/client/typeorm/repository/ClientRepository";
import AppError from "@shared/http/errors/AppError";
import { ClinicsRepository } from "../typeorm/repository/ClinicsRepository";
interface IRequest {
  id: string;
  name_clinica: string;
  address_clinica: string;
  phone: string;
}
export class UpdateClinicService {
  public async execute({ id, name_clinica, phone, address_clinica }: IRequest): Promise<Clinic | null> {
    const clinicsRepository = dataSource.getRepository(Clinic);
    const clinic = await ClinicsRepository.findById(clinicsRepository, id);

    if (!clinic) {
      throw new AppError('Clinic not found');
    }
    clinic.address_clinica = address_clinica,
      clinic.name_clinica = name_clinica,
      clinic.phone,

      await clinicsRepository.save(clinic);
    return clinic

  }
}