import dotEnv from 'dotenv'
import { verify } from 'jsonwebtoken'
import UserRepository from 'User/Domain/UserRepository'

dotEnv.config()
const { SECRET_KEY } = process.env

const UserProfiler = (userRepository: UserRepository) => async (identifier: string, bearerToken: string): Promise<any> => {
  // Verify exist bearerToken
  if (!bearerToken) {
    const error = ['Acceso denegado']
    return Promise.reject(error)
  }

  // Get token of bearerToken
  const token = bearerToken?.split(' ')[1]

  // Verify token
  verify(token, SECRET_KEY as string)

  // Get profile data of user by identifier provided
  const { hasExistedUser, errors, user } = await userRepository.getUserByIdentifier(identifier, 'username')
  if (!hasExistedUser) {
    return Promise.reject(errors)
  }

  // Filter rows of user
  const profile = {
    id: user?.id,
    name: user?.name,
    surname: user?.surname,
    username: user?.username,
    email: user?.email
  }

  return Promise.resolve({ hasProfileData: true, profile })
}

export default UserProfiler
