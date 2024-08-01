import { Repository } from 'typeorm';
import Doctor from '../entities/Doctor';


export class DoctorRepository extends Repository<Doctor> {
  public static async findByName(repository: Repository<Doctor>, name: string): Promise<Doctor | null> {
    const Doctor = await repository.findOne({
      where: {
        name_doctor: name,
      },
    });
    return Doctor;
  }
  public static async findById(repository: Repository<Doctor>, id: string): Promise<Doctor | null> {
    const Doctor = await repository.findOne({
      where: {
        id: id,
      },
    });
    return Doctor;
  }
}
