import { dataSource } from "@shared/typeorm";
import Client from "../typeorm/entities/Client";


export class ListClientService {
  public async execute(): Promise<Client[]> {
    const clientsRepository = dataSource.getRepository(Client)
    const clients = await clientsRepository.createQueryBuilder('client')
      .leftJoinAndSelect("client.agreement", "agreement")
      .select([
        "client.id",
        "client.name_client",
        "client.age",
        "client.created_at",
        "client.updated_at",
        "agreement.name_agreement",
        "agreement.id",
        "agreement.created_at",
        "agreement.updated_at",
      ])
      .getMany();

    return clients;
  }
}