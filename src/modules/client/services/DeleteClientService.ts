import { dataSource } from "@shared/typeorm";
import Client from "../typeorm/entities/Client"
import AppError from "@shared/http/errors/AppError";
interface IRequest {
  id: string;
}
export class DeleteClientService {

  public async execute({ id }: IRequest): Promise<void> {
    const clientsRepository = dataSource.getRepository(Client);
    const client = clientsRepository.findOne({
      where: { id }
    });

    if(!client) {
     throw new AppError('Client not found')
    }
  }
}