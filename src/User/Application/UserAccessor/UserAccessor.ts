import dotEnv from 'dotenv'
import UserRepository from 'User/Domain/UserRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from 'User/Domain/User'

dotEnv.config()
const { SECRET_KEY } = process.env

const UserAccessor = (userRepository: UserRepository) => async (email: string, password: string): Promise<any> => {
  // Search account by email
  const {
    hasExistedUser,
    errors: userErrors,
    user
  } = await userRepository.getUserByIdentifier(email, 'email')
  if (!hasExistedUser) {
    return Promise.reject(userErrors)
  }
  // const luser = User.instance(user)

  // Compare passwords
  const isSamePassword = await compare(password, user?.password as string)
  if (!isSamePassword) {
    const NotSameError = ['Las credenciales no son válidas']
    return Promise.reject(NotSameError)
  }

  // Generate a jsonwebtoken
  const token: string = sign({ _id: user?.id }, `${SECRET_KEY}`)
  const identifier = {
    username: user?.username,
    email: user?.email,
    password: user?.password
  }

  return Promise.resolve({ isValidCredentials: true, token, identifier })
}

export default UserAccessor
