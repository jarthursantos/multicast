import React, { useEffect, useState } from 'react'

import { format, parseISO } from 'date-fns'

import { Annotation } from '~/store/modules/accompaniments/types'

import { Wrapper, Content, CreationData, UserName, CreatedAt } from './styles'

const Observation: React.FC<Annotation> = ({ content, user, createdAt }) => {
  const [date, setDate] = useState('')

  useEffect(() => {
    function handleUpdate() {
      let parsedDate: Date

      if (typeof createdAt === 'string') {
        parsedDate = parseISO(createdAt)
      } else {
        parsedDate = createdAt
      }

      setDate(parsedDate ? format(parsedDate, 'dd/MM/yyyy') : '-')
    }

    const interval = setInterval(handleUpdate, 60000)

    handleUpdate()

    return () => clearInterval(interval)
  }, [createdAt])

  return (
    <Wrapper>
      <Content>{content}</Content>

      <CreationData>
        <UserName>{user.name}</UserName>

        <CreatedAt>{date}</CreatedAt>
      </CreationData>
    </Wrapper>
  )
}

export default Observation
