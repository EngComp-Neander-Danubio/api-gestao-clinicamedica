import { dataSource } from "@shared/typeorm";
import Appointment from "../entities/Appointment";
import AppError from "@shared/http/errors/AppError";
import { ClientRepository } from "@modules/client/typeorm/repository/ClientRepository";
import Client from "@modules/client/typeorm/entities/Client";
import Doctor from "@modules/doctor/typeorm/entities/Doctor";
import { DoctorRepository } from "@modules/doctor/typeorm/repository/DoctorRepository";
import { AppointmentRepository } from "../repository/AppointmentReposirtory";

interface IRequest {
  clientId: string;
  doctorId: string;
  date_appointment: string;
}

export class CreateAppointmentService {
  public async execute({ clientId, doctorId, date_appointment }: IRequest): Promise<Appointment> {
    const appointmentsRepository = dataSource.getRepository(Appointment);
    const clientsRepository = dataSource.getRepository(Client);
    const doctorsRepository = dataSource.getRepository(Doctor);
    
    /* const singleAppointment = await AppointmentRepository.findById(appointmentsRepository, id);
    if (singleAppointment) {
      throw new AppError("Appointment already exists");
    } */

    const clientExists = await ClientRepository.findById(clientsRepository, clientId);
    if (!clientExists) {
      throw new AppError("Client isn't defined");
    }

    const doctorExists = await DoctorRepository.findById(doctorsRepository, doctorId);
    if (!doctorExists) {
      throw new AppError("Doctor isn't defined");
    }

    const appointment = appointmentsRepository.create({
      date_appointment,
    });

    appointment.appointmentDoctors = doctorExists;
    appointment.appointmentClients = clientExists;

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
