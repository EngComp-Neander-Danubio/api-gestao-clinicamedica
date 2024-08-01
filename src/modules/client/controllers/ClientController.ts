import { Repository } from "typeorm";
import { ListClientService } from "../services/ListClientService";
import { Request, Response } from 'express';
import { ShowClientService } from "../services/ShowClientService";
import { DeleteClientService } from "../services/DeleteClientService";
import { UpdateClientService } from "../services/UpdateClientService";
import { CreateClientService } from "../services/CreateClientService";

export class ClientController {

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listClient = new ListClientService();
      const client = await listClient.execute();
      return response.json(client);
    } catch (err) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const listClient = new ShowClientService();
      const client = await listClient.execute({ id });
      return response.json(client);
    } catch (err) {
      return response.status(500).json({ error: "internal server error" });
    }
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const clientDelete = new DeleteClientService();
      const client = await clientDelete.execute({ id });
      return response.json(client);
    } catch (err) {
      return response.status(500).json({ error: "Error deleting client" });
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name_client, age, agreementId } = request.body;
    try {
      const clientUpdate = new UpdateClientService();
      const client = await clientUpdate.execute({ id, name_client, age });
      return response.json(client);
    }
    catch (err) {
      return response.status(500).json({ error: "Error updating client" })
    }
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name_client, age, agreementId } = request.body;
    try {
      const clientCreate = new CreateClientService();
      const client = await clientCreate.execute({ name_client, age, agreementId });
      return response.json(client);
    } catch (err) {
      return response.status(500).json({ err: "Internal Server Error" });
    }
  }


}