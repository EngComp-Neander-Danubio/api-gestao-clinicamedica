
import AppError from "@shared/http/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { dataSource } from "@shared/typeorm";
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = dataSource.getRepository(User);
    const user = await UserRepository.findByEmail(usersRepository, email);
    if (!user) {
      throw new AppError('Email incorrect')
    }
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Password or Username incorrect', 401)
    }
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })
    return {
      user,
      token,
    };
  }

}
export default CreateSessionService;