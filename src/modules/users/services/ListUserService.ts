import { dataSource } from "../../../shared/typeorm";
import User from "../typeorm/entities/User";

class ListUserService{
    public async execute(): Promise<User[]> {
        const usersRepository = dataSource.getRepository(User);
        const product = await usersRepository.find();
        return product;
    }
}
export default ListUserService;