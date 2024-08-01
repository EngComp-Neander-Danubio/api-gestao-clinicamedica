import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Doctor from "../typeorm/entities/Doctor";

interface IRequest {
  id: string;
}

export class DeleteDoctorService {
  public async execute({ id }: IRequest): Promise<void> {
    const doctorsRepository = dataSource.getRepository(Doctor);

    const singleDoctor = await doctorsRepository.findOne({
      where: { id },
    });

    if (!singleDoctor) {
      throw new AppError('Doctor not found');
    }

    await doctorsRepository.remove(singleDoctor);
  }
}
