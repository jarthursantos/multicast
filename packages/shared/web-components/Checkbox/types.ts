import { Dispatch, SetStateAction } from 'react'

export interface Props {
  label: string
  value: boolean
  onValueChange: Dispatch<SetStateAction<boolean>>
}
