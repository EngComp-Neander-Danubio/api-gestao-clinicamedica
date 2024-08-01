import { dataSource } from "@shared/typeorm";
import Appointment from "../entities/Appointment";
import AppError from "@shared/http/errors/AppError";
interface IRequest {
  id: string;
}
export class ShowAppointmentService {
  public async execute({id}: IRequest): Promise<Appointment | null> {
    const appointmentsRepository = dataSource.getRepository(Appointment);

    const singleAppointment = await appointmentsRepository.findOne({
      where: { id }});

    if (!singleAppointment){
      throw new AppError('Appointment not found')
    }
    return singleAppointment;
  }
}