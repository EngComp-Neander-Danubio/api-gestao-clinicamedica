
import { Request, Response } from "express";
import UpdateAvatarUserService from "../services/UpdateUserAvatarService";


export default class UserAvatarController{

    public async update (request: Request, response: Response): Promise<Response>{
        const updateAvatar = new UpdateAvatarUserService();
        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file?.filename,
        });
        return response.json(user);
    }

}