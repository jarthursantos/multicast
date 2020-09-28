import React from 'react'

import { useActivePage } from '../context'
import { Container } from './styles'
import { PageProps } from './types'

const Page: React.FC<PageProps> = ({ name, children }) => {
  const isActive = useActivePage(name)

  return <Container hidden={!isActive}>{children}</Container>
}

export default Page
