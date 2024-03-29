import React from 'react'

import { useKeyExtractor, useSelectedRow, useSortedData } from '../context'
import Row from './Row'
import { Container } from './styles'

const Body: React.FC = () => {
  const data = useSortedData()
  const keyExctractor = useKeyExtractor()
  const selectedRow = useSelectedRow()

  return (
    <Container selectedRow={selectedRow}>
      {data.map(item => {
        const id = keyExctractor(item)

        return <Row key={id} id={id} data={item} />
      })}
    </Container>
  )
}

export default Body
