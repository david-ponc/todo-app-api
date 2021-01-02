import { v4 as uuidV4 } from 'uuid'

export enum Category {
  HOME = 'home',
  PERSONAL = 'personal',
  WORK = 'work'
}

type ParamsConstructor = {
  content: string
  category: Category
  userIdentifier: string
}

export default class Task {
  private _id: string
  private _content: string
  private _category: Category
  private _completed: boolean
  private _userIdentifier: string

  private constructor (params: ParamsConstructor) {
    this._id = uuidV4()
    this._content = params.content
    this._category = params.category
    this._completed = false
    this._userIdentifier = params.userIdentifier
  }

  static create (params: ParamsConstructor) : Task | Array<string> {
    const { content, category, userIdentifier } = params
    let isValidTask = true
    const errors = []

    if (!content) {
      isValidTask = false
      errors.push('El contenido de la tarea es obligatorio')
    }

    if (!category) {
      isValidTask = false
      errors.push('Debe seleccionar una categoría para crear una tarea')
    }

    if (!userIdentifier) {
      isValidTask = false
      errors.push('Error con el usuario asociado a la tarea')
    }

    if (!isValidTask) {
      return errors
    }
    return new Task(params)
  }

  static instance (params: ParamsConstructor) : Task {
    return new Task(params)
  }

  get id (): string { return this._id }
  get content (): string { return this._content }
  get category (): Category { return this._category }
  get completed (): boolean { return this._completed }
  get userIdentifier (): string { return this._userIdentifier }

  set id (value: string) { this._id = value }
  set content (value: string) { this._content = value }
  set category (value: Category) { this._category = value }
  set completed (value: boolean) { this._completed = value }
  set userIdentifier (value: string) { this._userIdentifier = value }
}
