import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgetPasswordController from '../controllers/ForgetPasswordService';
import ResetPasswordController from '../controllers/ResetPasswordController';
const passwordRouter = Router();
const forgetPasswordController = new ForgetPasswordController();
const resetPasswordController = new ResetPasswordController();
passwordRouter.post('/forget',
celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
       //  password: Joi.string().required(),
    },
}), forgetPasswordController.create);

passwordRouter.post('/reset',
celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
}), resetPasswordController.create);

export default passwordRouter;