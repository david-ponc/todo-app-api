import dotEnv from 'dotenv'
import { verify } from 'jsonwebtoken'
import TaskRepository from 'Task/Domain/TaskRepository'

dotEnv.config()
const { SECRET_KEY } = process.env

const TaskCompleter = (taskRepository: TaskRepository) => async (
  identifier: string,
  bearerToken: string,
  taskIdentifier: string
): Promise<any> => {
  // Verify exist bearerToken
  if (!bearerToken) {
    const error = ['Acceso denegado']
    return Promise.reject(error)
  }
  // Get token of bearerToken
  const [authType, token] = bearerToken?.split(' ')
  console.log('token: ', token)
  if (authType !== 'Bearer') {
    const error = ['El tipo de autenticación no es válido']
    return Promise.reject(error)
  }

  // Verify token
  verify(token, SECRET_KEY as string)

  // Modify completed row of task
  const { hasCompletedTask, errors } = await taskRepository.complyTask(taskIdentifier)
  if (!hasCompletedTask) {
    return Promise.reject(errors)
  }

  return Promise.resolve({ hasCompletedTask })
}

export default TaskCompleter
