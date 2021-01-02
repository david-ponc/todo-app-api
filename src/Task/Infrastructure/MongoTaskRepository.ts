import dotEnv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'
import Task from 'Task/Domain/Task'
import TaskRepository from 'Task/Domain/TaskRepository'

dotEnv.config()
const { MONGO_URL, MONGO_DB_TASK, MONGO_COLLECTION_TASK } = process.env

export default class MongoTaskRepository implements TaskRepository {
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
      const db = conn.db(`${MONGO_DB_TASK}`)
      return Promise.resolve(db)
    } catch (err) {
      console.log('Error: [MongoTaskRepository connect] -> ', err)
    }
  }

  async getTasks (identifier: string): Promise<any> {
    const errors = []
    let hasExistedTasks = true
    let tasks
    try {
      const db: Db | undefined = await this.connect()
      const collection: Collection | undefined = db?.collection(`${MONGO_COLLECTION_TASK}`)

      tasks = await collection?.find({ $and: [{ userIdentifier: identifier }, { completed: false }] }).sort({ createdAt: -1 }).toArray()
    } catch (_) {
      hasExistedTasks = false
      errors.push('Error al obtener las tareas del usuario')
    }
    return Promise.resolve({ hasExistedTasks, errors, tasks })
  }

  async createTask (task: Task): Promise<any> {
    const errors = []
    let hasExistedTask = true
    let persistTask
    try {
      const db: Db | undefined = await this.connect()
      const collection: Collection | undefined = db?.collection(`${MONGO_COLLECTION_TASK}`)

      persistTask = await collection?.insertOne({
        _id: task.id,
        content: task.content,
        category: task.category,
        userIdentifier: task.userIdentifier,
        completed: task.completed,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      })
    } catch (_) {
      hasExistedTask = false
      errors.push('La tarea no fue encontrada')
    }
    return Promise.resolve({ hasExistedTask, errors, persistTask: persistTask?.ops[0] })
  }

  async complyTask (taskIdentifier: string): Promise<any> {
    const errors = []
    let hasCompletedTask = true
    try {
      const db: Db | undefined = await this.connect()
      const collection: Collection | undefined = db?.collection(`${MONGO_COLLECTION_TASK}`)
      await collection?.updateOne({ _id: taskIdentifier }, { $set: { completed: true } })
    } catch (_) {
      hasCompletedTask = false
      errors.push('La tarea no fue encontrada')
    }
    return Promise.resolve({ hasCompletedTask, errors })
  }
}
