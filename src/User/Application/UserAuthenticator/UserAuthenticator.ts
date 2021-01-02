import UserRepository from 'User/Domain/UserRepository'
import User from 'User/Domain/User'

const userAuthenticator = (userRepository: UserRepository) => async (emailToken: string): Promise<any> => {
  // Obtener usuario con el emailToken proporcionado
  const { hasExistedUser, errors: userErrors, user } = await userRepository.getUserByIdentifier(emailToken, 'emailToken')
  if (!hasExistedUser) {
    return Promise.reject(userErrors)
  }
  console.log(user instanceof User)
  console.log(user)

  // Modificar el campo authenticated a verdadero
  const { isAuthenticated, errors: authErrors } = await userRepository.authenticateUser(user as User)
  if (!isAuthenticated) {
    return Promise.reject(authErrors)
  }

  return Promise.resolve(true)
}

export default userAuthenticator
