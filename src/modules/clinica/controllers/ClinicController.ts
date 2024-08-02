

import { Request, Response } from 'express';
import { ListClinicService } from '../services/ListClinicService';
import { ShowClinicService } from '../services/ShowClinicService';
import { CreateClinicService } from '../services/CreateClinicService';
import { UpdateClinicService } from '../services/UpdateClinicService';
import { DeleteClinicService } from '../services/DeleteClinicService';

export class ClinicController {

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listClinic = new ListClinicService();
      const clinic = await listClinic.execute();
      return response.status(200).json(clinic)

    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const showClinic = new ShowClinicService()
      const clinic = await showClinic.execute({ id });
      return response.status(200).json(clinic)

    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { address_clinica, name_clinica, phone } = request.body;
    try {
      const createClinic = new CreateClinicService();
      const clinic = createClinic.execute({ address_clinica, name_clinica, phone })
      return response.status(200).json(clinic);

    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { address_clinica, name_clinica, phone } = request.body;
    try {
      const updateClinic = new UpdateClinicService();
      const clinic = updateClinic.execute({ id, address_clinica, name_clinica, phone });
      return response.status(200).json(clinic)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Error Server ' });
    }
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const removeClinic = new DeleteClinicService();
      const clinic = removeClinic.execute({ id })
      return response.status(200).json(clinic);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}