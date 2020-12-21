import { IFile } from './IFile'

export interface IMailData {
  body: string
  to: string
  subject: string
  cc?: string
  bcc?: string
}

export interface IAccompanimentMailData extends IMailData {
  file?: IFile
}
