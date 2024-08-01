import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
import Agreement from "../typeorm/entities/Agreement";
import { AgreementsRepository } from "../typeorm/repository/AgreementsRepository";

interface IRequest {
  name_agreement: string;
}

export class CreateAgreementService {
  public async execute({ name_agreement }: IRequest): Promise<Agreement> {
    const agreementsRepository = dataSource.getRepository(Agreement);
    const singleAgreementExists = await AgreementsRepository.findByName(agreementsRepository, name_agreement);

    if (singleAgreementExists) {
      throw new AppError("Agreement is already defined");
    }

    const agreement = agreementsRepository.create({
      name_agreement,
    });

    await agreementsRepository.save(agreement);

    return agreement;
  }
}
