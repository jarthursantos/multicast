import { v4 as uuid } from 'uuid'

import { URL } from '~/configs/url'

export interface IFile {
  readonly id: string

  filename: string
  originalname: string
  url: string
}

export function createFile(
  props: Omit<IFile, 'id' | 'url'>,
  id?: string
): IFile {
  return {
    filename: props.filename,
    originalname: props.originalname,

    url: `${URL}/files/${props.filename}`,
    id: id || uuid()
  }
}
