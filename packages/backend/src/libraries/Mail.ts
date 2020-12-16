import nodemailer from 'nodemailer'
import Mailer from 'nodemailer/lib/mailer'

import mailConfig from '~/configs/mail'

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

const transporter: Mailer = nodemailer.createTransport({
  ...mailConfig,
  tls: {
    rejectUnauthorized: false
  }
})

export async function sendMail(message: IMessage): Promise<void> {
  await transporter.sendMail({
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
