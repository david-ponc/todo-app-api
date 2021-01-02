import dotEnv from 'dotenv'
import { verify } from 'jsonwebtoken'
import TaskRepository from 'Task/Domain/TaskRepository'
import Task from 'Task/Domain/Task'

dotEnv.config()
const { SECRET_KEY } = process.env

const TaskCreator = (taskRepository: TaskRepository) => async (
  identifier: string, bearerToken: string, taskDraft: any): Promise<any> => {
  // Verify exist bearerToken
  if (!bearerToken) {
    const error = ['Acceso denegado']
    return Promise.reject(error)
  }

  // Get token of bearerToken
  const [authType, token] = bearerToken?.split(' ')
  if (authType !== 'Bearer') {
    const error = ['El tipo de autenticación no es válido']
    return Promise.reject(error)
  }

  // Verify token
  verify(token, SECRET_KEY as string)

  // Create task object
  const task = Task.create({
    content: taskDraft.content,
    category: taskDraft.category,
    userIdentifier: identifier
  })
  if (!(task instanceof Task)) {
    return Promise.reject(task)
  }

  // Persist tasks object
  const { hasExistedTask, errors, persistTask } = await taskRepository.createTask(task)
  if (!hasExistedTask) {
    return Promise.reject(errors)
  }

  return Promise.resolve({ hasExistedTask, task: persistTask })
}

export default TaskCreator
