import Internaut from 'User/Domain/Internaut'
import User from 'User/Domain/User'
import Email from 'Notification/Domain/Email'
import UserRepository from 'User/Domain/UserRepository'
import NotifierRepository from 'Notification/Domain/NotifierRepository'

const UserCreator = (
  userRepository: UserRepository,
  notifierRepository: NotifierRepository
) => async (internaut: Internaut): Promise<any> => {
  // Build user after to verify internaut data
  const { isValidInternaut, errors: validateInternautErrors, user } = User.build(internaut)
  if (!isValidInternaut) {
    return Promise.reject(validateInternautErrors)
  }

  // Persist data user
  if (user instanceof User) {
    const { isUserCreated, errors: userCreatorErrors } = await userRepository.userCreator(user)
    if (!isUserCreated) {
      return Promise.reject(userCreatorErrors)
    }
  }

  // Create sender object
  const mailer = new Email({
    from: 'To Do List App',
    to: user?.email || '',
    subject: 'Confirmación de correo electrónico',
    body: ''
  })

  // Send email to sender with generated token
  const { isEmailSent, errors: mailerErrors } = await notifierRepository.sendConfirmationEmail(mailer, user?.emailToken as string)
  if (!isEmailSent) {
    return Promise.reject(mailerErrors)
  }

  return Promise.resolve(true)
}

export default UserCreator
