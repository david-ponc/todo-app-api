import dotEnv from 'dotenv'
import { verify } from 'jsonwebtoken'
import TaskRepository from 'Task/Domain/TaskRepository'

dotEnv.config()
const { SECRET_KEY } = process.env

const TaskProvider = (taskRepository: TaskRepository) => async (identifier: string, bearerToken: string): Promise<any> => {
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

  // Get user tasks by identifier
  const { hasExistedTasks, errors, tasks } = await taskRepository.getTasks(identifier)
  if (!hasExistedTasks) {
    return Promise.reject(errors)
  }

  return Promise.resolve({ hasExistedTasks, tasks })
}

export default TaskProvider
