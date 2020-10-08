import React from 'react'

import { useActiveReport } from '../context'
import { Container, Number, Title } from './styles'
import { ReportProps } from './types'

const Report: React.VFC<ReportProps> = ({ number, title, name }) => {
  const [isActive, setActive] = useActiveReport(name)

  return (
    <Container className={isActive && 'active'} onClick={setActive}>
      <Number>{number <= 9 ? `0${number}` : number}</Number>
      <Title>{title}</Title>
    </Container>
  )
}

export default Report
