import { dataSource } from "@shared/typeorm";
import Client from "../typeorm/entities/Client";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
  id: string;
  age: Date;
  name_client: string;
}
export class UpdateClientService {
  public async execute({ id, age, name_client }: IRequest): Promise<Client | null> {
    const clientsRepository = dataSource.getRepository(Client)
    const client = await clientsRepository.findOne({
      where: { id }
    });

    if(!client) {
      throw new AppError('Client not found')
    }

    client.age = age;
    client.name_client = name_client;

    await clientsRepository.save(client);
    return client;
  }
}