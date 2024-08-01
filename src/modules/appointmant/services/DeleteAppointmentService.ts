import { dataSource } from "@shared/typeorm";
import Appointment from "../entities/Appointment";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
  id: string;
}
export class DeleteAppointmentService {
  public async execute({ id }: IRequest): Promise<void> {
    const appointmentsRepository = dataSource.getRepository(Appointment);
    const appointment = await appointmentsRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new AppError('Appointment not found')
    }

    await appointmentsRepository.remove(appointment);
  }
}