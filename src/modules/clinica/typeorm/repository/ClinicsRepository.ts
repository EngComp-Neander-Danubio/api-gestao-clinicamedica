import { stat } from "fs";
import { Repository } from "typeorm";
import Clinic from "../entities/Clinic";


export class ClinicsRepository extends Repository<Clinic> {
  public static async findByName(repository: Repository<Clinic>, name: string): Promise<Clinic | null> {
    const clinic = await repository.findOne({
      where: {
        name_clinica: name
      }
    });
    return clinic
  }

  public static async findById(repository: Repository<Clinic>, id: string): Promise<Clinic | null> {
    const clinic = await repository.findOne({
      where: {
        id: id,
      }
    })
    return clinic
  }
}