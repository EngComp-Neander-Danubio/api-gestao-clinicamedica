import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandleBarsMailTemplate';
interface IMailContact{
    name: string;
    email: string;
}
interface ITemplateVariables {
    [key: string]: string | number;
}
interface IParseMailTemplate{
    template: string;
    variables:ITemplateVariables;
}
interface IsendMail{
    to: IMailContact;
    from: IMailContact;
    subject: string;
    templateData:IParseMailTemplate;

}

export default class EtherealMail {
    static async sendEmail({to, from, subject, templateData}: IsendMail):Promise<void>{
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandlebarsMailTemplate();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }

        });
        const message = await transporter.sendMail({
            from: {
                name: from?.name || "Equipe api vendas",
                address: from?.email || 'equipe@apivendas.com.br',
            },
            to: {
                name: to?.name || "Equipe de api vendas",
                address: to?.email || 'equipe@apivendas.com',
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });
        console.log('Message sent: %s',message.messageId);
        console.log('Preview URL: %s',nodemailer.getTestMessageUrl(message));
    }

}