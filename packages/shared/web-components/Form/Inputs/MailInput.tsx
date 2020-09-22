import React from 'react'

import { InputProps } from '../types'
import { TextInput } from './TextInput'

type Props = InputProps & React.HTMLAttributes<HTMLDivElement>

const MailInput: React.FC<Props> = ({ inputProps, ...rest }) => {
  return <TextInput {...rest} inputProps={{ ...inputProps, type: 'email' }} />
}

export { MailInput }
