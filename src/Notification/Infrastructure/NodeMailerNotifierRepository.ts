import dotEnv from 'dotenv'
import { createTransport } from 'nodemailer'
import Email from 'Notification/Domain/Email'
import MailerRepository from 'Notification/Domain/NotifierRepository'
import { confirmAccountTemplate } from './Templates/ConfirmAccountTemplate'

dotEnv.config()
const { AUTH_MAILER_USER, AUTH_MAILER_PASS } = process.env

export default class NodeMailerNotifierRepository implements MailerRepository {
  public async sendConfirmationEmail (email: Email, token: string): Promise<any> {
    const errors = []
    let isEmailSent = true
    const mailOptions = {
      from: email.from || 'To Do List App',
      to: email.to,
      subject: email.subject || 'Confirmación de correo electrónico',
      html: confirmAccountTemplate(token)
    }
    try {
      await NodeMailerNotifierRepository.getMailer().sendMail(mailOptions)
    } catch (_) {
      isEmailSent = false
      errors.push(`No se pudo enviar el correo a: ${email.to}`)
    }
    return { isEmailSent, errors }
  }

  static getMailer () {
    return createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: AUTH_MAILER_USER,
        pass: AUTH_MAILER_PASS
      }
    })
  }
}
