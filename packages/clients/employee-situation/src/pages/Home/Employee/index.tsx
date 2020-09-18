import React, { useMemo } from 'react'

import {
  Container,
  PersonalData,
  Code,
  Name,
  SituationData,
  Situation,
  Chip
} from './styles'

export interface EmployeeData {
  name: string
  code: number
  sector: string
  func?: string
  type?: 'F' | 'M' | 'A'
  situation?: 'I' | 'A'
}

const Employee: React.FC<EmployeeData> = props => {
  const { name, code, sector, func, type, situation } = props

  const currentSituation = useMemo(() => {
    if (situation === 'A') {
      return 'ATIVO'
    }

    if (situation === 'I') {
      return 'INATIVO'
    }

    return undefined
  }, [situation])

  const currentType = useMemo(() => {
    if (type === 'A') {
      return 'ASSISTENTE'
    }

    if (type === 'M') {
      return 'MOTORISTA'
    }

    if (type === 'F') {
      return 'FUNCIONÁRIO'
    }

    return undefined
  }, [type])

  return (
    <Container>
      <PersonalData>
        <Name>{name}</Name>
        <Code>{code}</Code>
      </PersonalData>

      <SituationData>
        <Situation>
          {sector} - {func || 'Sem Função'}
        </Situation>

        {currentType && <Chip>{currentType}</Chip>}
        {currentSituation && <Chip>{currentSituation}</Chip>}
      </SituationData>
    </Container>
  )
}

export default Employee
