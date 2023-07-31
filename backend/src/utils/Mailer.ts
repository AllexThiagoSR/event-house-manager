import * as nodeMailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class Mailer {
  private transporter: nodeMailer.Transporter;
  private config: SMTPTransport.Options = {
    host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: parseInt(process.env.MAIL_PORT || '2525'),
    auth: {
      user: process.env.MAIL_USER || '570b79b43f8e53',
      pass: process.env.MAIL_PASS || '82d0421197ebf5'
    },
  };

  constructor (private mailer = nodeMailer, config?: SMTPTransport.Options) {
    this.config = config || this.config;
    this.transporter = this.mailer.createTransport(this.config);
  }

  async sendMail(from: string, to: string, subject:string, html: string) {
    const retorno = await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log(retorno);
    
  }
}
