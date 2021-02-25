import { Accompaniment } from '~/store/modules/accompaniments/types'

export interface ConfirmMailSendedDialogProps {
  accompaniment: Accompaniment
  isOpen: boolean
  onClose(): void
}
