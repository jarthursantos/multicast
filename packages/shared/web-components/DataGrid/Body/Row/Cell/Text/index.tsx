import React from 'react'

import { Container, ContainerProps } from './styles'

interface Props extends ContainerProps {
  value: string
  translate?(value: string): string
}

const Text: React.FC<Props> = ({ value, align, translate }) => {
  return (
    <Container align={align}>{translate ? translate(value) : value}</Container>
  )
}

export default Text
