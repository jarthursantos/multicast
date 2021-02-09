// import { Dispatch, SetStateAction } from 'react'

export interface Props {
  label: string
  value: boolean
  onValueChange(value: boolean): void
  // onValueChange: Dispatch<SetStateAction<boolean>>
}
