import dotEnv from 'dotenv'
import { MongoClient, Db, Collection, ObjectId } from 'mongodb'
import User from 'User/Domain/User'
import UserRepository from 'User/Domain/UserRepository'
import { UserResponse } from 'User/Domain/UserResponse'

dotEnv.config()
const { MONGO_URL, MONGO_DB_USER, MONGO_COLLECTION_USER } = process.env

export default class MongoUserRepository implements UserRepository {
  private _client: MongoClient
  constructor () {
    this._client = new MongoClient(`${MONGO_URL}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  }

  private async connect (): Promise<Db | undefined> {
    try {
      const conn = await this._client.connect()
      const db = conn.db(`${MONGO_DB_USER}`)
      return Promise.resolve(db)
    } catch (err) {
      console.log('Error: [MongoUserRepository connect] -> ', err)
    }
  }

  public async userCreator (user: User): Promise<{ isUserCreated: boolean, errors: Array<string> }> {
    const errors = []
    let isUserCreated = true
    try {
      const db: Db | undefined = await this.connect()
      const collection: Collection | undefined = db?.collection(`${MONGO_COLLECTION_USER}`)
      const mongoUser = {
        _id: new ObjectId(user.id),
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        password: user.password,
        emailToken: user.emailToken,
        authenticated: user.authenticated,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
      await collection?.insertOne(mongoUser)
    } catch (_) {
      isUserCreated = false
      errors.push('Utilice una dirección de correo diferente para su registro')
    }
    return Promise.resolve({ isUserCreated, errors })
  }

  async getUserByIdentifier (identifier: string, type: string): Promise<UserResponse> {
    const errors = []
    let hasExistedUser = true
    let user
    try {
      const db: Db | undefined = await this.connect()
      const collection: Collection | undefined = db?.collection(`${MONGO_COLLECTION_USER}`)
      user = await collection?.findOne({ [type]: `${identifier}` })

      if (!user.authenticated && type !== 'emailToken') {
        hasExistedUser = false
        errors.push('Debes confirmar tu cuenta antes de poder acceder a ella.')
      }
      if (!hasExistedUser) {
        return Promise.resolve({ hasExistedUser, errors })
      }
    } catch (_) {
      hasExistedUser = false
      user = null
      errors.push('El usuario no fue encontrado')
    }
    return Promise.resolve({ hasExistedUser, errors, user })
  }

  async authenticateUser (user: User): Promise<any> {
    const errors = []
    let isAuthenticated = true
    try {
      const db: Db | undefined = await this.connect()
      const collection: Collection | undefined = db?.collection(`${MONGO_COLLECTION_USER}`)
      const res = await collection?.updateOne({ emailToken: user.emailToken }, { $set: { authenticated: true, emailToken: null } })
      if (!res?.result.ok) {
        isAuthenticated = false
        errors.push('El usuario no pudo ser autenticado')
      }
      user.authenticated = true
      user.emailToken = null
    } catch (_) {
      isAuthenticated = false
      errors.push('El usuario no pudo ser autenticado')
    }
    return Promise.resolve({ isAuthenticated, errors })
  }
}
