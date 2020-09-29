import React, { useCallback, memo } from 'react'

import BooleanCell from './Boolean'
import ContabilCell from './Contabil'
import DateCell from './Date'
import NumberCell from './Number'
import { Container } from './styles'
import TextCell from './Text'
import { CellType, RowCellProps } from './types'

const Cell: React.FC<RowCellProps> = ({ value, index, cell }) => {
  const renderValue = useCallback(() => {
    switch (cell.type) {
      case CellType.CONTABIL:
        return <ContabilCell {...{ value }} />
      case CellType.DATE:
        return <DateCell {...{ value, includeTime: cell.includeTime }} />
      case CellType.NUMBER:
        return (
          <NumberCell {...{ value, fractionDigits: cell.fractionDigits }} />
        )
      case CellType.TEXT:
        return (
          <TextCell
            {...{ value, align: cell.align, translate: cell.translate }}
          />
        )
      case CellType.BOOLEAN:
        return (
          <BooleanCell
            {...{
              value,
              positive: cell.positiveValue,
              negative: cell.negativeValue
            }}
          />
        )
    }
  }, [value, cell])

  return <Container className={`col-${index}`}>{renderValue()}</Container>
}

export default memo(Cell)
