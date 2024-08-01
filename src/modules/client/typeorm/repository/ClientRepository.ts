import { Repository } from "typeorm";
import Client from "../entities/Client";

export class ClientRepository extends Repository<Client> {
  public static async findByName(repository: Repository<Client>, name: string): Promise<Client | null> {
    const client = await repository.findOne({
      where: {
        name_client: name
      },
    });
    return client;
  }
  public static async findById(repository: Repository<Client>, id: string): Promise<Client | null> {
    const client = await repository.findOne({

      where: { id: id, }
    });
    return client;
  }
}