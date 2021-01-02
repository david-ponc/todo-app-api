import MongoUserRepository from 'User/Infrastructure/MongoUserRepository'
import userAuthenticator from './UserAuthenticator'

const UserRepositoryI = new MongoUserRepository()
export default userAuthenticator(UserRepositoryI)
