import React from 'react'

import { Container } from './styles'
import { Props } from './types'

const Auth: React.FC<Props> = () => {
  return <Container />
}

export type AuthProps = Props
export { Auth as AuthPage }
