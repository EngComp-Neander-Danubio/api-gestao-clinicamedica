import { dataSource } from "@shared/typeorm";
import Appointment from "../entities/Appointment";

export class ListAppointmentsService {
  public async execute(): Promise<Appointment[]> {
    const appointmentsRepository = dataSource.getRepository(Appointment);

    const appointments = await appointmentsRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect("appointment.appointmentClients", "client")
      .leftJoinAndSelect("appointment.appointmentDoctors", "doctor")
      .select([
        "appointment.id",
        "appointment.date_appointment",
        "appointment.created_at",
        "appointment.updated_at",
        "client.id",
        "client.name_client",
        "client.created_at",
        "client.updated_at",
        "doctor.id",
        "doctor.name_doctor",
        "doctor.created_at",
        "doctor.updated_at",
      ])
      .getMany();

    return appointments;
  }
}
