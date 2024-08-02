import { dataSource } from "@shared/typeorm";
import Clinic from "../typeorm/entities/Clinic";
import AppError from "@shared/http/errors/AppError";
interface IRequest {
  id: string;
  name_clinica: string;
  address: string;
  phone: string;
}
export class DeleteClinicService {

  public async execute({ id }: IRequest): Promise<Clinic | null> {
    const clinicsRepository = dataSource.getRepository(Clinic);
    const clinic = await clinicsRepository.findOne({
      where: { id: id }
    })
    if (!clinic) {
      throw new AppError('Clinic does not exist')
    }
      await clinicsRepository.remove(clinic)
    return clinic;

  }
}