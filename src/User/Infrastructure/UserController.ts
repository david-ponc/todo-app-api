import { Request, Response } from 'express'
import UserCreator from 'User/Application/UserCreator'
import UserAuthenticator from 'User/Application/UserAuthenticator'
import UserAccessor from 'User/Application/UserAccessor'
import UserProfiler from 'User/Application/UserProfiler'

const userProfilerController = async (req: Request, res: Response): Promise<void> => {
  const { identifier } = req.params
  const token = req.headers.authorization
  try {
    const { hasProfileData, profile } = await UserProfiler(identifier, token as string)
    res.status(200).send({ error: null, hasProfileData, profile })
  } catch (err) {
    res.status(400).send({ error: err, hasProfileData: false })
  }
}

const userCreatorController = async (req: Request, res: Response): Promise<void> => {
  const { internaut } = req.body
  try {
    const isRegistered = await UserCreator(internaut)
    res.status(201).send({ error: null, isRegistered })
  } catch (err) {
    res.status(400).send({ error: err, isRegistered: false })
  }
}

const userValidatorController = async (req: Request, res: Response): Promise<void> => {
  const emailToken = req.header('email-token')
  try {
    const isAuthenticated = await UserAuthenticator(emailToken as string)
    res.status(200).send({ error: null, isAuthenticated })
  } catch (err) {
    res.status(400).send({ error: err, isAuthenticated: false })
  }
}

const userAccessorController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const { isValidCredentials, token, identifier } = await UserAccessor(email, password)
    res.status(200)
      .header('auth-token', token)
      .send({ error: null, isValidCredentials, identifier })
  } catch (err) {
    res.status(400).send({ error: err, isValidCredentials: false })
  }
}

export { userProfilerController, userCreatorController, userValidatorController, userAccessorController }
