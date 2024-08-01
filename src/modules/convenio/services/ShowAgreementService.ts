import { dataSource } from "@shared/typeorm";
import Agreement from "../typeorm/entities/Agreement";
import { AgreementsRepository } from "../typeorm/repository/AgreementsRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
  id: string;
}

export class ShowAgreementService {
  public async execute({ id }: IRequest): Promise<Agreement | null> {
    const agreementsRepository = dataSource.getRepository(Agreement);
    const agreement = await agreementsRepository.findOne({
      where: {
        id
      }
    });

    if (!agreement) {
      new AppError('Agreement not found')
    }
    return agreement;
  }
}