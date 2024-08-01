
import { dataSource } from "../../../shared/typeorm/index";
import AppError from "@shared/http/errors/AppError";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository ";
import EtherealMail from "@config/mail/EtherealMail";
import UserToken from "../typeorm/entities/UserToken";
import User from "../typeorm/entities/User";
interface IRequest {
  email: string;
};
class SendForgetPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = dataSource.getRepository(User);
    const userTokenRepository = dataSource.getRepository(UserToken);
    const user = await UserRepository.findByEmail(usersRepository, email);

    if (!user) {
      throw new AppError(`User ${email} not found)`);
    }

    const token = await UserTokenRepository.generate(userTokenRepository, user.id)
    // console.log(token);
    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: user.name,
        email: user.email,
      },
      subject: '[Api vendas] recuperação de vendas',
      templateData: {
        template: `Olá{{name}}{{token}}`,
        variables: {
          name: user.name,
          token: token?.token,
        },
      },
    });
  }
}
export default SendForgetPasswordEmailService;