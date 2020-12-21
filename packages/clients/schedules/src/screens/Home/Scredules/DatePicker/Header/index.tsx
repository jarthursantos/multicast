import React, { useMemo } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Container, Title, Button } from './styles'

interface Props {
  month: Date
  onNext(): void
  onPrevious(): void
}

const Header: React.FC<Props> = ({ month, onNext, onPrevious }) => {
  const name = useMemo(() => {
    const formatedDate = format(month, "MMMM 'de' yyyy", { locale: ptBR })

    const firstLetterUpper = formatedDate.substring(0, 1).toUpperCase()

    return `${firstLetterUpper}${formatedDate.substring(1)}`
  }, [month])

  return (
    <Container>
      <Button onClick={onPrevious}>
        <MdKeyboardArrowLeft size={24} />
      </Button>
      <Title>{name}</Title>
      <Button onClick={onNext}>
        <MdKeyboardArrowRight size={24} />
      </Button>
    </Container>
  )
}

export default Header
