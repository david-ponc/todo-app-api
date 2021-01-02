import { v4 as uuidV4 } from 'uuid'

type ConstructorParams = {
  from: string
  to: string
  subject: string
  body: string
};

export default class Email {
  readonly id: string
  readonly from: string
  readonly to: string
  readonly subject: string
  readonly body: string

  constructor (params: ConstructorParams) {
    this.id = uuidV4()
    this.from = params.from
    this.to = params.to
    this.subject = params.subject
    this.body = params.body
  }
}
