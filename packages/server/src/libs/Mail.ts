import mailConfig from 'configs/mail'
import nodemailer from 'nodemailer'
import Mailer from 'nodemailer/lib/mailer'

export interface IAddress {
  email: string
  name: string
}

export interface IMessage {
  to: IAddress
  from: IAddress
  subject: string
  body: string
}

class Mail {
  private transporter: Mailer

  constructor() {
    this.transporter = nodemailer.createTransport({
      ...mailConfig,
      tls: {
        rejectUnauthorized: false
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}

export default new Mail()
