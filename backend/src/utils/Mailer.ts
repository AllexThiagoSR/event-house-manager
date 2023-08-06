import * as nodeMailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import IEvent from '../interfaces/IEvent';
import EventWithUsers from '../interfaces/EventWithUsers';

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

  async sendMail(from: string, to: string, subject:string, html: string) {
    const retorno = await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log(retorno);
    return retorno;
  }

  async sendInviteEventMail(to: string, event: IEvent, token: string) {
    const body = `
    <h2>You were invite to an event</h2>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    <p>Ticket: ${token}</p>`;
    await this.sendMail(
      this.adminMail,
      to,
      'Invite confirmation',
      body,
    );
  }

  async sendSignEventMail(to: string, event: IEvent, token?: string) {
    const body = `
    <h2>You signed to an event</h2>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    ${token ? `<p>Ticket: ${token}</p>` : ''}`;
    await this.sendMail(
      this.adminMail,
      to,
      'Sign confirmation',
      body,
    );
  }

  async sendDeletedEventMail(to: string, event: IEvent) {
    const body = `
    <h2>Canceled event</h2>
    <p>An event that you were registered was canceled</p>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    `;
    await this.sendMail(
      this.adminMail,
      to,
      'Cancellation notification',
      body,
    );
  }

  async sendUpdatedEventMail(to: string, event: IEvent) {
    const body = `
    <h2>Updated event</h2>
    <p>An event you registered for has been updated, its new information is below</p>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    `;
    await this.sendMail(
      this.adminMail,
      to,
      'Update notification',
      body,
    );
  }

  async sendManyMails(event: EventWithUsers, type: 'Deleted' | 'Updated') {
    event.signedUsers.forEach(async ({ email }) => {
      await this[`send${type}EventMail`](email, event);
      console.log('Mail sent');
    });
  }
}
