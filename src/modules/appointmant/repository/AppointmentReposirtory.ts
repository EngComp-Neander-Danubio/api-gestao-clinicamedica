import { Repository } from "typeorm";
import Appointment from "../entities/Appointment";

export class AppointmentRepository extends Repository<Appointment> {
 
  public static async findById(repository: Repository<Appointment>, id: string): Promise<Appointment | null> {
    const appointment = await repository.findOne({
      where:
        { id },
    })
    return appointment
  }
}