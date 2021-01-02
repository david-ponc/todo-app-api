import TaskProvider from './TaskProvider'
import MongoTaskRepository from 'Task/Infrastructure/MongoTaskRepository'

const taskRepositoryI = new MongoTaskRepository()
export default TaskProvider(taskRepositoryI)
