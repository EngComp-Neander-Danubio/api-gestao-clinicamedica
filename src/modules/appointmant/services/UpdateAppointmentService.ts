import { dataSource } from "@shared/typeorm";
import Appointment from "../entities/Appointment";
import AppError from "@shared/http/errors/AppError";
import Doctor from "@modules/doctor/typeorm/entities/Doctor";
import Client from "@modules/client/typeorm/entities/Client";
import { DoctorRepository } from "@modules/doctor/typeorm/repository/DoctorRepository";
import { ClientRepository } from "@modules/client/typeorm/repository/ClientRepository";

interface IRequest {
  id: string;
  clientId: string;
  doctorId: string;
  date_appointment: Date;
}

export class UpdateAppointmentService {
  public async execute({ id, clientId, date_appointment, doctorId }: IRequest): Promise<Appointment> {
    const appointmentsRepository = dataSource.getRepository(Appointment)
    const doctorsRepository = dataSource.getRepository(Doctor)
    const clientsRepository = dataSource.getRepository(Client)
    const appointment = await appointmentsRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new AppError('Appointment not found')
    }
    const doctorExists = await DoctorRepository.findById(doctorsRepository, doctorId);
    if (!doctorExists) {
      throw new AppError('Appointment not found')
    }
    const clientExists = await ClientRepository.findById(clientsRepository, clientId);
    if (!clientExists) {
      throw new AppError('Appointment not found')
    }

    appointment.date_appointment = date_appointment;
    appointment.appointmentDoctors = doctorExists;
    appointment.appointmentClients = clientExists;
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}