import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

import { User } from './User'

export class Annotation {
  public readonly id: string

  public content: string
  public userId: string
  public accompanimentId: string

  public createdAt?: Date
  public user?: User

  constructor(props: Omit<Annotation, 'id'>, id?: string) {
    Object.assign(
      this,
      pick(props, 'content', 'userId', 'accompanimentId', 'user', 'createdAt')
    )

    this.id = id || uuid()
    this.createdAt = this.createdAt || new Date()
  }
}
