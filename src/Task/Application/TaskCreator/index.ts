import MongoTaskRepository from 'Task/Infrastructure/MongoTaskRepository'
import TaskCreator from './TaskCreator'

const taskRepositoryI = new MongoTaskRepository()
export default TaskCreator(taskRepositoryI)
