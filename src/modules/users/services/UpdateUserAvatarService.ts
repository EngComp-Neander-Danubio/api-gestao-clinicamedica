
import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import path from "path";
import upload from "@config/upload";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateAvatarUserService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = dataSource.getRepository(User);

    const user = await UserRepository.findById(usersRepository, user_id);

    if (!user) {
      throw new AppError(`User not found`);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    };
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;

  }

}
export default UpdateAvatarUserService;