
import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";
import { hash } from "bcryptjs";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = dataSource.getRepository(User);
    const emailExits = await UserRepository.findByEmail(usersRepository, email);
    if (emailExits) {
      throw new AppError('There is already')
    }
    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create(
      {
        name: name,
        email: email,
        password: hashedPassword
      }
    );
    await usersRepository.save(user);

    return user;
  }

}
