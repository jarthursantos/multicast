import { v4 as uuid } from 'uuid'

import { IUser } from './IUser'

export interface IAnnotation {
  readonly id: string

  content: string
  userId: string
  accompanimentId: string

  createdAt?: Date
  user?: IUser
}

export function createAnnotation(
  props: Omit<IAnnotation, 'id'>,
  id?: string
): IAnnotation {
  return {
    content: props.content,
    userId: props.userId,
    accompanimentId: props.accompanimentId,
    user: props.user,
    id: id || uuid(),
    createdAt: props.createdAt || new Date()
  }
}
