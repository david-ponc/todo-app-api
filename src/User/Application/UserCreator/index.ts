import UserCreator from './UserCreator'
import MongoUserRepository from 'User/Infrastructure/MongoUserRepository'
import NodeMailerNotifierRepository from 'Notification/Infrastructure/NodeMailerNotifierRepository'

const UserRepositoryI = new MongoUserRepository()
const NotifierRepositoryI = new NodeMailerNotifierRepository()
export default UserCreator(UserRepositoryI, NotifierRepositoryI)
