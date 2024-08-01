import { dataSource } from "@shared/typeorm";
import Client from "../typeorm/entities/Client";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
  id: string;
}
export class ShowClientService {
  public async execute({ id }: IRequest): Promise<Client> {
    const clientsRepository = dataSource.getRepository(Client);
    const clientExists =  await clientsRepository.findOne({
      where: { id: id },
    }
    )
    if (!clientExists) {
      throw new AppError('Client not found')
    }
    return clientExists;
  }
}