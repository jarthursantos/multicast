import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

export class File {
  public readonly id: string

  public filename: string
  public originalname: string

  constructor(props: Omit<File, 'id'>, id?: string) {
    Object.assign(this, pick(props, 'filename', 'originalname'))

    this.id = id || uuid()
  }
}
