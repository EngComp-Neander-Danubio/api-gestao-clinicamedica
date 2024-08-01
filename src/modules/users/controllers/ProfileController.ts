
import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";


export default class ProfileController{
    public async show (request: Request, response: Response){
        const showProfile = new ShowProfileService();
        const user_id = request.user.id;

        const users = await showProfile.execute({user_id});

        return response.json(users);
    }


    public async update (request: Request, response: Response){
        const { name, email, new_password, old_password } = request.body;
        const user_id  = request.user.id;
        const updateUser = new UpdateProfileService();
        const users = await updateUser.execute({
            user_id,
            name,
            email,
            new_password,
            old_password,
        });
        return response.json(users);
    }

}