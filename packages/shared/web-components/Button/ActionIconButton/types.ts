import { ReactElement } from 'react'

export type ActionIconButtonProps = React.ButtonHTMLAttributes<
  HTMLButtonElement
> & {
  icon: ReactElement
  label: string
  width?: number
}
