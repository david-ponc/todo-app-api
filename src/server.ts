import express, { Application, json, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotEnv from 'dotenv'
import {
  userProfilerController,
  userValidatorController,
  userAccessorController,
  userCreatorController
} from 'User/Infrastructure/UserController'
import {
  taskProviderController,
  taskCreatorController,
  taskCompleterController
} from 'Task/Infrastructure/TaskController'

dotEnv.config()
const { PORT } = process.env
const server: Application = express()
server.use(cors({
  exposedHeaders: ['auth-token']
}))
server.use(json())
server.use(morgan('dev'))

// Welcome Route
server.get('/', (req: Request, res: Response) => {
  res.status(200).send({ status: "running" })
})

// User Auth Routes
server.get('/users/:identifier/profile', userProfilerController)
server.post('/users/auth/sign-up', userCreatorController)
server.post('/users/auth/sign-in', userAccessorController)
server.put('/users/auth/confirm-email', userValidatorController)

// Task Routes
server.get('/tasks/:identifier/list', taskProviderController)
server.post('/tasks/:identifier', taskCreatorController)
server.put('/tasks/:identifier', taskCompleterController)

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
