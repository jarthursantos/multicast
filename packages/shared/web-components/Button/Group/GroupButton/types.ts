import { ReactElement } from 'react'

export interface GroupButtonProps {
  name: string
  icon: string | ReactElement
  label: string
  width?: number
}
