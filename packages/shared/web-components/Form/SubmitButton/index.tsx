import React from 'react'

import { Container } from './styles'

const SubmitButton: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = props => {
  return <Container {...props} type="submit"></Container>
}

export { SubmitButton }
