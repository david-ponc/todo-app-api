import Task from './Task'

export default interface TaskRepository {
  getTasks (identifier: string): Promise<any>
  createTask (task: Task): Promise<any>
  complyTask (taskRepository: string): Promise<any>
}
