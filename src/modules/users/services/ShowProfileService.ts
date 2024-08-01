
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
interface IRequest {
  user_id: string;
}
class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = dataSource.getRepository(User);
    const user = await UserRepository.findById(usersRepository, user_id);
    if (!user) {
      throw new AppError('User not found')
    }
    return user;
  }
}
export default ShowProfileService;