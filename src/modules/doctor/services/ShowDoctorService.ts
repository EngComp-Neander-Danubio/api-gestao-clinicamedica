import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Doctor from "../typeorm/entities/Doctor";

interface IRequest {
  id: string;

}

export class ShowDoctorService {
  public async execute({ id }: IRequest): Promise<Doctor | undefined> {
    const doctorsRepository = dataSource.getRepository(Doctor);

    const singleDoctor = await doctorsRepository.findOne({
      where: { id },
    });

    if (!singleDoctor) {
      throw new AppError('Doctor not found');
    }

    return singleDoctor;
  }
}
