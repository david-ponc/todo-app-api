import UserProfiler from './UserProfiler'
import MongoUserRepository from 'User/Infrastructure/MongoUserRepository'

const UserRepositoryI = new MongoUserRepository()

export default UserProfiler(UserRepositoryI)
