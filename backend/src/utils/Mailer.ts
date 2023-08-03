import * as nodeMailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import IEvent from '../interfaces/IEvent';

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

  private adminMail: string;

  constructor (adminMail: string, private mailer = nodeMailer, config?: SMTPTransport.Options) {
    this.config = config || this.config;
    this.transporter = this.mailer.createTransport(this.config);
    this.adminMail = adminMail;
  }

  async sendMail(to: string, subject:string, html: string) {
    const retorno = await this.transporter.sendMail({
      from: this.adminMail,
      to,
      subject,
      html,
    });
    console.log(retorno);
    return retorno;
  }

  async sendInviteMail(to: string, token: string, event: IEvent) {
    const body = `
    <h2>You were invite to an event</h2>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    <p>Ticket: ${token}</p>`;
    await this.sendMail(
      to,
      'Invite confirmation',
      body,
    );
  }

  async sendSignMail(to: string, event: IEvent, token?: string) {
    const body = `
    <h2>You signed to an event</h2>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    ${token ? `<p>Ticket: ${token}</p>` : ''}`;
    await this.sendMail(
      to,
      'Sign confirmation',
      body,
    );
  }
}
