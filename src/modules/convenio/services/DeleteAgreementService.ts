import { dataSource } from "@shared/typeorm";
import Agreement from "../typeorm/entities/Agreement";
import AppError from "@shared/http/errors/AppError";
import { AgreementsRepository } from "../typeorm/repository/AgreementsRepository";
interface IRequest {
  id: string;
}
export class DeleteAgreementService {
  public async execute({ id }: IRequest): Promise<void> {
    const agreementsRepository = dataSource.getRepository(Agreement)
    const agreement = await agreementsRepository.findOne({
      where: { id }
    });
    if (!agreement) {
      throw new AppError('Could not find agreement')
    }
    await agreementsRepository.remove(agreement)

  }
}