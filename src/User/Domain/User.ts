import { v4 as uuidV4 } from 'uuid'
import { genSaltSync, hashSync } from 'bcryptjs'
import { randomBytes } from 'crypto'
import Internaut from './Internaut'

const SALT_ROUNDS = 10
const RANDOM_BYTES_SIZE = 64

type ConstructorParams = {
  id: string
  name: string
  surname: string
  username: string
  email: string
  password: string
  emailToken: string | null
  authenticated: boolean
}

export default class User {
  private _id: string
  private _name: string
  private _surname: string
  private _username: string
  private _email: string
  private _password: string
  private _emailToken: string | null
  private _authenticated: boolean

  private constructor (params: ConstructorParams) {
    this._id = params.id
    this._name = params.name
    this._surname = params.surname
    this._username = params.username
    this._email = params.email
    this._password = params.password
    this._emailToken = params.emailToken
    this._authenticated = params.authenticated
  }

  static build (internaut: Internaut): { isValidInternaut: boolean, errors: Array<string>, user?: User } {
    const { name, surname, username, email, password } = internaut
    let isValidInternaut = true
    const errors = []

    if (!/[a-zA-Z]{4,}/.test(name)) {
      isValidInternaut = false
      errors.push('El nombre no tiene un formato válido')
    }

    if (!/[a-zA-Z]{4,}/.test(surname)) {
      isValidInternaut = false
      errors.push('El apellido no tiene un formato válido')
    }

    if (!/(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}/.test(username)) {
      isValidInternaut = false
      errors.push('El nombre de usuario no tiene un formato válido')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValidInternaut = false
      errors.push('El correo electrónico no tiene un formato válido')
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/.test(password)) {
      isValidInternaut = false
      errors.push('La contraseña debe tener al menos 8 caracteres')
    }

    if (isValidInternaut) {
      const user: User = new User({
        id: User.ObjectId(),
        name,
        surname,
        username,
        email,
        password: User.encryptPassword(password),
        emailToken: randomBytes(RANDOM_BYTES_SIZE).toString('hex'),
        authenticated: false
      })
      return { isValidInternaut, errors, user }
    }

    return { isValidInternaut, errors }
  }

  static ObjectId () {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16)
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16)
    }).toLowerCase()
  };

  static instance (data: ConstructorParams): User {
    return new User(data)
  }

  static encryptPassword (password: string): string {
    const salt = genSaltSync(SALT_ROUNDS)
    return hashSync(password, salt)
  }

  get id (): string { return this._id }
  get name (): string { return this._name }
  get surname (): string { return this._surname }
  get username (): string { return this._username }
  get email (): string { return this._email }
  get password (): string { return this._password }
  get emailToken (): string | null { return this._emailToken }
  get authenticated (): boolean { return this._authenticated }

  set id (id : string) { this._id = id }
  set name (name : string) { this._name = name }
  set surname (surname : string) { this._surname = surname }
  set username (username : string) { this._username = username }
  set email (email : string) { this._email = email }
  set password (password : string) { this._password = password }
  set emailToken (emailToken : string | null) { this._emailToken = emailToken }
  set authenticated (authenticated : boolean) { this._authenticated = authenticated }
}
