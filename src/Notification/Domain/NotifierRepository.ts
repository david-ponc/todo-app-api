import Email from './Email'

export default interface NotifierRepository {
  sendConfirmationEmail (email: Email, token: string) : Promise<any>
}
