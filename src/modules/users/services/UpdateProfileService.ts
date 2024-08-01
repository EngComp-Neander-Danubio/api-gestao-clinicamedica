
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
import { compare, hash } from "bcryptjs";
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  new_password?: string;
  old_password?: string;
}
class UpdateProfileService {
  public async execute({ user_id, name, email, new_password, old_password }: IRequest): Promise<User> {
    const usersRepository = dataSource.getRepository(User);
    const user = await UserRepository.findById(usersRepository, user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    const userUpdateEmail = await UserRepository.findByEmail(usersRepository, email);
    if (userUpdateEmail && email !== userUpdateEmail?.email) {
      throw new AppError('There is already one user with this email');
    }

    if (new_password && !old_password) {
      throw new AppError('Old password is required');
    }
    if (new_password && old_password) {
      const checkpassword = await compare(old_password, user.password);
      if (!checkpassword) {
        throw new AppError('Passwords do not match')
      }
      user.password = await hash(new_password, 8);
    }
    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
export default UpdateProfileService;