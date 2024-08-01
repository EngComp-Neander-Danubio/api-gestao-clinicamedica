import { CreateSpecialtyService } from "../services/CreateSpecialtyServices";
import { DeleteSpecialtyService } from "../services/DeleteSpecialtyService";
import { ListSpecialtyService } from "../services/ListSpecialtyServices";
import { Request, Response } from 'express';
import { UpdateSpecialtyService } from "../services/UpdateSpecialtyService";
import { ShowSpecialtyService } from "../services/ShowSpecialtyService";

export class SpecialtysController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listSpecialty = new ListSpecialtyService();
      const Specialtys = await listSpecialty.execute();
      return response.json(Specialtys);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }


  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const showSpecialty = new ShowSpecialtyService();
      const Specialty = await showSpecialty.execute({ id });
      return response.json(Specialty);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name_specialty } = request.body
    try {
      const createSpecialty = new CreateSpecialtyService();
      const Specialty = await createSpecialty.execute({
        name_specialty,

      });
      return response.json(Specialty);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name_specialty } = request.body
    try {
      const updateSpecialty = new UpdateSpecialtyService();
      const Specialty = await updateSpecialty.execute({
        id,
        name_specialty,
      });
      return response.json(Specialty);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const deleteSpecialty = new DeleteSpecialtyService();
      const Specialty = await deleteSpecialty.execute({
        id,
      });
      return response.json([]);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }

  }
}
