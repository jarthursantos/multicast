import { URL } from 'configs/url'
import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

export class File {
  public readonly id: string

  public filename: string
  public originalname: string
  public url?: string

  constructor(props: Omit<File, 'id' | 'url'>, id?: string) {
    Object.assign(this, pick(props, 'filename', 'originalname'))

    this.url = `${URL}/files/${this.filename}`
    this.id = id || uuid()
  }
}
