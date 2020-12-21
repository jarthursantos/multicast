export interface PickerHandlers {
  open(position: DOMRect, selectedDate?: Date): void
}

export interface PickerProps {
  onSelectionChange(selection: Date): void
  position: 'top' | 'bottom'
}
