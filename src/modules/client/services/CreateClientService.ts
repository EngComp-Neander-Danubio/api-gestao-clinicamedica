import { dataSource } from "@shared/typeorm";
import Client from "../typeorm/entities/Client";
import AppError from "@shared/http/errors/AppError";
import { ClientRepository } from "../typeorm/repository/ClientRepository";
import { AgreementsRepository } from "@modules/convenio/typeorm/repository/AgreementsRepository";
import Agreement from "@modules/convenio/typeorm/entities/Agreement";

interface IRequest {
  name_client: string;
  agreementId: string;
  age: Date;
}
export class CreateClientService {
  public async execute({ name_client, age, agreementId }: IRequest): Promise<Client> {
    const clientsRepository = dataSource.getRepository(Client);
    const agreementsRepository = dataSource.getRepository(Agreement);
    const agreementsExists = await AgreementsRepository.findById(agreementsRepository, agreementId);

    if (!agreementsExists) {
      throw new AppError('Client does not exist')
    }
    const client = clientsRepository.create({
      name_client,
      age,
    })
    client.agreement = agreementsExists;
    await clientsRepository.save(client);
    return client;
  }
}