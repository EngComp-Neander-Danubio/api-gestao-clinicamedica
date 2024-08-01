import { Repository } from "typeorm";
import UserToken from "../entities/UserToken";

export class UserTokenRepository extends Repository<UserToken>{
  public static async findByToken(repository: Repository<UserToken>, token:string):Promise<UserToken | null>
    {
        const userToken = await repository.findOne({
            where: {
                token,
            }
        })

        return userToken;
    }
  public async generate(repository: Repository<UserToken>, user_id:string):Promise<UserToken>
    {
        const userToken = this.create({
                user_id,
        });
        await this.save(userToken);
        return userToken;
    }
}

export default UserTokenRepository;