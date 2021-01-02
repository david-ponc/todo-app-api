import User from './User'

export type UserResponse = {
  hasExistedUser: boolean,
  errors?: Array<string>
  user?: User
}
