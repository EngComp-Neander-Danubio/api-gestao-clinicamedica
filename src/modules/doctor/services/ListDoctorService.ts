import { dataSource } from "../../../shared/typeorm";
import Doctor from "../typeorm/entities/Doctor";
import Specialty from "@modules/especiality/typeorm/entities/Specialty";

export class ListDoctorService {
  public async execute(): Promise<Doctor[]> {
    const doctorsRepository = dataSource.getRepository(Doctor);

    const doctors = await doctorsRepository.createQueryBuilder('doctor')
      .leftJoinAndSelect("doctor.specialty", "specialty")
      .select([
        "doctor.id",
        "doctor.name_doctor",
        "doctor.age",
        "doctor.created_at",
        "doctor.updated_at",
        "specialty.name_specialty",
        "specialty.id",
        "specialty.created_at",
        "specialty.updated_at",
      ])
      .getMany();

    return doctors;
  }
}
