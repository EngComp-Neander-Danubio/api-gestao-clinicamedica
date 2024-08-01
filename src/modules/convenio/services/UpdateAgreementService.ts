import { dataSource } from "@shared/typeorm";
import Agreement from "../typeorm/entities/Agreement";
import { AgreementsRepository } from "../typeorm/repository/AgreementsRepository";
import AppError from "@shared/http/errors/AppError";
interface IRequest {
  id: string;
  name_agreement: string;
}
export class UpdateAgreementService {
  public async execute({ id, name_agreement }: IRequest): Promise<Agreement | null> {
    const agreementsRepository = dataSource.getRepository(Agreement);
    const singleAgreement = await agreementsRepository.findOne({
      where: { id }
    })

    if (!singleAgreement) {
      throw new AppError('Agreement not found')
    }
    const agreementExists = await AgreementsRepository.findByName(agreementsRepository, name_agreement);
    if (agreementExists && name_agreement !== singleAgreement?.name_agreement) {
      throw new AppError("Agreement is already defined");
    }

    singleAgreement.name_agreement = name_agreement;

    await agreementsRepository.save(singleAgreement);
    return singleAgreement;
  }
}