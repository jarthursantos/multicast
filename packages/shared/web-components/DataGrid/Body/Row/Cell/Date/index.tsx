import React, { useMemo } from 'react'

import { format, parseISO } from 'date-fns'

import { Container } from './styles'

interface Props {
  value: Date | string
  includeTime?: boolean
}

const Date: React.FC<Props> = ({ value, includeTime }) => {
  const mask = useMemo(() => `dd/MM/yyyy${includeTime ? ' HH:mm' : ''}`, [
    includeTime
  ])

  const date = useMemo(() => {
    if (typeof value === 'string') {
      return format(parseISO(value), mask)
    }

    if (value instanceof Date) {
      return format(value, mask)
    }

    return '-'
  }, [value])

  return <Container>{date}</Container>
}

export default Date
