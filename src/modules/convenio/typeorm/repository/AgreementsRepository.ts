import { Repository } from "typeorm";
import Agreement from "../entities/Agreement";


export class AgreementsRepository extends Repository<Agreement> {
  public static async findByName(repository: Repository<Agreement>, name_agreement: string): Promise<Agreement | null> {
    const agreement = await repository.findOne({
      where: {
        name_agreement: name_agreement,
      }
    });
    return agreement;
  }

  public static async findById(repository: Repository<Agreement>, id: string): Promise<Agreement | null> {
    const agreement = await repository.findOne({
      where: {
        id: id,
      },
    });
    return agreement;
  }
}