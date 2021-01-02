import MongoTaskRepository from 'Task/Infrastructure/MongoTaskRepository'
import TaskCompleter from './TaskCompleter'

const taskRepositoryI = new MongoTaskRepository()
export default TaskCompleter(taskRepositoryI)
