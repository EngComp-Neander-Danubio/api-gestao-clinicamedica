import { dataSource } from "@shared/typeorm";
import Agreement from "../typeorm/entities/Agreement";
import { AgreementsRepository } from "../typeorm/repository/AgreementsRepository";


export class ListAgreementService {
  public async execute(): Promise<Agreement[]> {
    const agreementsRepository = dataSource.getRepository(Agreement);
    const agreement = await agreementsRepository.find();

    return agreement;

  }

}