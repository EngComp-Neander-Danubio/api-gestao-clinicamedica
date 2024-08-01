import { Repository } from "typeorm";
import User from "../entities/User";


export class UserRepository extends Repository<User> {
  public static async findByName(repository: Repository<User>, name: string): Promise<User | null> {
    const user = await repository.findOne({
      where: {
        name,
      }
    })
    return user;
  }
  public static async findById(repository: Repository<User>, id: string): Promise<User | null> {
    const user = await repository.findOne({
      where: {
        id,
      }
    })
    return user;
  }
  public static async findByEmail(repository: Repository<User>, email: string): Promise<User | null> {
    const user = await repository.findOne({
      where: {
        email,
      }
    })
    return user;
  }
}

export default UserRepository;