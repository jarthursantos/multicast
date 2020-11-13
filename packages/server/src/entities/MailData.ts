import { File } from './File'

export interface MailData {
  body: string
  to: string
  subject: string
  cc?: string
  bcc?: string
}

export interface AccompanimentMailData extends MailData {
  file?: File
}
