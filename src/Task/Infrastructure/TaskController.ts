import { Request, Response } from 'express'
import TaskProvider from 'Task/Application/TaskProvider'
import TaskCreator from 'Task/Application/TaskCreator'
import TaskCompleter from 'Task/Application/TaskCompleter'

const taskProviderController = async (req: Request, res: Response): Promise<void> => {
  const { identifier } = req.params
  const token = req.headers.authorization
  try {
    const { hasExistedTasks, tasks } = await TaskProvider(identifier, token as string)
    res.status(200).send({ hasExistedTasks, tasks })
  } catch (error) {
    res.status(400).send({ hasExistedTasks: false, error })
  }
}

const taskCreatorController = async (req: Request, res: Response): Promise<void> => {
  const { taskDraft } = req.body
  const { identifier } = req.params
  const token = req.headers.authorization
  try {
    const { hasExistedTask, task } = await TaskCreator(identifier, token as string, taskDraft)
    res.status(200).send({ hasExistedTask, task })
  } catch (error) {
    res.status(400).send({ hasExistedTask: false, error })
  }
}

const taskCompleterController = async (req: Request, res: Response): Promise<void> => {
  const { taskIdentifier } = req.body
  const { identifier } = req.params
  const token = req.headers.authorization
  try {
    const { hasCompletedTask, tasks } = await TaskCompleter(identifier, token as string, taskIdentifier)
    res.status(200).send({ hasCompletedTask, tasks })
  } catch (error) {
    res.status(400).send({ hasCompletedTask: false, error })
  }
}

export { taskProviderController, taskCreatorController, taskCompleterController }
