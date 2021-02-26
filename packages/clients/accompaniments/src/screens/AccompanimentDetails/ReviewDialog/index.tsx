import React from 'react'

import { Container } from './styles'
import { ReviewDialogProps } from './types'

const ReviewDialog: React.VFC<ReviewDialogProps> = ({ isOpen }) => {
  return <Container visible={isOpen}>Opa</Container>
}

export { ReviewDialog }
