import React from 'react'

import dot from 'dot-object'

import { useColumnsCell, useRowStyle, useRowWidth } from '../../context'
import Cell from './Cell'
import { Container } from './styles'
import { RowProps } from './types'

const Row: React.FC<RowProps> = ({ id, data }) => {
  const style = useRowStyle(data)
  const width = useRowWidth()

  const columns = useColumnsCell()

  return (
    <Container className={`row-${id}`} style={{ ...style, width }}>
      {columns.map((cell, index) => (
        <Cell
          value={dot.pick(cell.path, data)}
          key={`${index}.${data.id}`}
          {...{ cell, index }}
        />
      ))}
    </Container>
  )
}

export default Row
