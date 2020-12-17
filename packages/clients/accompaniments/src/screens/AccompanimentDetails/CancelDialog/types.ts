export interface CancelDialogProps {
  accompanimentId: string
  isOpen: boolean
  onClose(): void
}

export interface CancelData {
  motive: string
}
