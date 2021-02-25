import { Accompaniment } from '~/store/modules/accompaniments/types'

export interface ActionsProps {
  accompaniment?: Accompaniment
  sended: boolean
  reviewed: boolean
  released: boolean
  scheduled: boolean
  unlocked: boolean
  finished: boolean
  openConfirmMail(): void
  openCancel(): void
  openAccompanimentReview(): void
  submitForm(): void
}
