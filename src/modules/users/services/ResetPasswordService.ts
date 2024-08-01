import AppError from "@shared/http/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository ";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import { dataSource } from "@shared/typeorm";
import User from "../typeorm/entities/User";
import UserToken from "../typeorm/entities/UserToken";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = dataSource.getRepository(User);
    const userTokenRepository = dataSource.getRepository(UserToken);
    const userToken = await UserTokenRepository.findByToken(userTokenRepository, token);
    const user = await UserRepository.findById(usersRepository, userToken.user_id);
    if (!userToken) {
      throw new AppError(`Token not found)`);
    }

    if (!user) {
      throw new AppError(`User not found)`);
    }
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError(`Token expired`);
    }
    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}
export default ResetPasswordService;