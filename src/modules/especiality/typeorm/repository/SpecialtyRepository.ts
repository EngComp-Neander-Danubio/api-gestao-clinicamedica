import { Repository } from 'typeorm';
import Specialty from '../entities/Specialty';

export class SpecialtyRepository extends Repository<Specialty> {
  public static async findByName(repository: Repository<Specialty>, name: string): Promise<Specialty | null> {
    const specialties = await repository.findOne({
      where: {
        name_specialty: name,
      },
    });
    return specialties;
  }
  public static async findById(repository: Repository<Specialty>, id: string): Promise<Specialty | null> {
    const specialties = await repository.findOne({
      where: {
        id: id,
      },
    });
    return specialties;
  }
}
