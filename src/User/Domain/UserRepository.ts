import User from './User'
import { UserResponse } from './UserResponse'

export default interface UserRepository {
  getUserByIdentifier (identifier: string, type: string): Promise<UserResponse>
  userCreator (user: User): Promise<any>
  authenticateUser (user: User): Promise<any>
}
