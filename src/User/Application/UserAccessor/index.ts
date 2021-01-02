import MongoUserRepository from 'User/Infrastructure/MongoUserRepository'
import UserAccessor from './UserAccessor'

const UserRepositoryI = new MongoUserRepository()
export default UserAccessor(UserRepositoryI)
