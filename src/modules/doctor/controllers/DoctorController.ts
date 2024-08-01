import { CreateDoctorService } from "../services/CresteDoctorService";
import { DeleteDoctorService } from "../services/DeleteDoctorServices";
import { ListDoctorService } from "../services/ListDoctorService";
import { ShowDoctorService } from "../services/ShowDoctorService";
import { UpdateDoctorService } from "../services/UpdateDoctorService";
import { Request, Response } from 'express';

export class DoctorController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listDoctor = new ListDoctorService();
      const doctors = await listDoctor.execute();
      return response.json(doctors);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const showDoctor = new ShowDoctorService();
      const Doctor = await showDoctor.execute({ id });
      return response.json(Doctor);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name_doctor, specialtiesId, age, appointmentId } = request.body
    try {
      const createDoctor = new CreateDoctorService();
      const doctor = await createDoctor.execute({
        name_doctor,
        age,
        specialtiesId,
        appointmentId,
      });
      return response.json(doctor);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name_doctor } = request.body
    try {
      const updateDoctor = new UpdateDoctorService();
      const Doctor = await updateDoctor.execute({
        name_doctor,
        id,
      });
      return response.json(Doctor);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const deleteDoctor = new DeleteDoctorService();
      const Doctor = await deleteDoctor.execute({
        id,
      });
      return response.json([]);
    } catch (error) {
      // Adiciona um tratamento básico de erros
      return response.status(500).json({ error: 'Internal Server Error' });
    }

  }
}
