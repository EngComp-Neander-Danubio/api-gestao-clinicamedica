
import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import { CreateUserService } from "../services/CreateUserService";


export default class UsersController{
    public async index (request: Request, response: Response){
        const listUsers = new ListUserService();

        const users = await listUsers.execute();

        return response.json(users);
    }


    public async create (request: Request, response: Response){
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();
        const users = await createUser.execute({
            name,
            email,
            password
        });

        return response.json(users);
    }

}