import AppError from "@shared/http/errors/AppError";
import { dataSource } from "../../../shared/typeorm";
import Doctor from "../typeorm/entities/Doctor";
import { DoctorRepository } from "../typeorm/repository/DoctorRepository";

interface IRequest {
  id: string;
  name_doctor: string;
}

export class UpdateDoctorService {
  public async execute({ id, name_doctor }: IRequest): Promise<Doctor | undefined> {
    const doctorsRepository = dataSource.getRepository(Doctor);

    const doctor = await doctorsRepository.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new AppError('doctor not found');
    }
    const doctorExists = await DoctorRepository.findByName(doctorsRepository, name_doctor);
    if (doctorExists && name_doctor !== doctor.name_doctor) {
      throw new AppError("doctor is already defined");
    }
    doctor.name_doctor = name_doctor;
    await doctorsRepository.save(doctor);
    return doctor;
  }
}
