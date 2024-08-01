import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
import Doctor from "../typeorm/entities/Doctor";
import { DoctorRepository } from "../typeorm/repository/DoctorRepository";
import { SpecialtyRepository } from "@modules/especiality/typeorm/repository/SpecialtyRepository";
import Specialty from "@modules/especiality/typeorm/entities/Specialty";
import { AppointmentRepository } from "@modules/appointmant/repository/AppointmentReposirtory";
import Appointment from "@modules/appointmant/entities/Appointment";

interface IRequest {
  name_doctor: string;
  age: Date;
  specialtiesId: string;
  appointmentId: string;
}

export class CreateDoctorService {
  public async execute({ name_doctor, specialtiesId, age, appointmentId }: IRequest): Promise<Doctor> {
    const doctorsRepository = dataSource.getRepository(Doctor);
    const specialtiesRepository = dataSource.getRepository(Specialty);
    const singleDoctorExists = await DoctorRepository.findByName(doctorsRepository, name_doctor);
    const specialtyExists = await SpecialtyRepository.findById(specialtiesRepository, specialtiesId);

    if (singleDoctorExists) {
      throw new AppError("Doctor is already defined");
    }
    if (!specialtyExists) {
      throw new AppError("Specialty isn't defined");
    }

    const singleDoctor = doctorsRepository.create({
      name_doctor,
      age,
    });
    singleDoctor.specialty = specialtyExists;
    await doctorsRepository.save(singleDoctor);

    return singleDoctor;
  }
}
