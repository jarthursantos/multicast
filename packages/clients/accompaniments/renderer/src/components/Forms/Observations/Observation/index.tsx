import React from 'react'

import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Wrapper, Content, CreationData, UserName, CreatedAt } from './styles'
import { ObservationProps } from './types'

const Observation: React.FC<ObservationProps> = ({
  content,
  createdBy,
  createdAt
}) => {
  return (
    <Wrapper>
      <Content>{content}</Content>

      <CreationData>
        <UserName>{createdBy.name}</UserName>

        <CreatedAt>
          {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
        </CreatedAt>
      </CreationData>
    </Wrapper>
  )
}

export default Observation
