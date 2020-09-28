import React from 'react'

import { useKeybinding, useSortedData } from '../context'
import Row from './Row'
import { Container } from './styles'

const Body: React.FC = () => {
  const data = useSortedData()
  const keyBinding = useKeybinding()

  return (
    <Container>
      {data.map(item => {
        const id = `${item[keyBinding]}`
        return <Row key={id} id={id} data={item} />
      })}
    </Container>
  )
}

export default Body
