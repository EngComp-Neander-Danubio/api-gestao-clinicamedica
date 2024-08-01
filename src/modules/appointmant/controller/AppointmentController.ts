import { Request, Response } from 'express';
import { ListAppointmentsService } from "../services/ListAppointmentService";
import { CreateAppointmentService } from "../services/CreateAppointmentService";
import { ShowAppointmentService } from "../services/ShowAppointmentService";
import { DeleteAppointmentService } from "../services/DeleteAppointmentService";

export class AppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listAppointments = new ListAppointmentsService();
      const appointments = await listAppointments.execute();
      return response.json(appointments)

    } catch (err) {
      return response.status(500).json({ err: "Internal Server Error" });
    }
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const showAppointments = new ShowAppointmentService();
      const appointments = await showAppointments.execute({ id });
      return response.json(appointments);
    } catch (err) {
      return response.status(500).json({ err: "Internal Server Error" });
    }
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { clientId, doctorId, date_appointment } = request.body;
    try {
      const showAppointments = new CreateAppointmentService();
      const appointments = await showAppointments.execute({ clientId, date_appointment, doctorId });
      return response.status(200).json(appointments);
    }
    catch (err) {
      return response.status(500).json({ err: "Internal Server Error" })
    }
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      const deleteAppointment = new DeleteAppointmentService();
      await deleteAppointment.execute({ id });
      return response.status(200).json("success")
    } catch (err) {
      return response.status(500).json({ err: "Internal Server Error" });
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { clientId, doctorId, date_appointment } = request.body;
    const { id } = request.params;
    try {
      const showAppointments = new CreateAppointmentService();
      const appointments = await showAppointments.execute({ clientId, date_appointment, doctorId, id });
      return response.status(200).json(appointments);
    }
    catch (err) {
      return response.status(500).json({ err: "Internal Server Error" })
    }
  }
}