
import { Request, Response } from "express";
import SendForgetPasswordEmailService from "../services/SendForgetPasswordEmailService";
export default class ForgetPasswordController{
     public async create (request: Request, response: Response):Promise<Response>{
        const { email } = request.body;
        const sendForgetPasswordEmail = new SendForgetPasswordEmailService();
        await sendForgetPasswordEmail.execute({
            email,
        });
        return response.status(204).json();
    };
};