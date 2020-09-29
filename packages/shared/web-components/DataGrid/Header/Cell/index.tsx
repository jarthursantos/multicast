import React from 'react'
// import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'

import { Indexable } from '../../types'
import { Container } from './styles' // OrderIndicatorContainer
import { HeaderCellProps } from './types'

const Cell: React.FC<HeaderCellProps & Indexable> = ({
  title,
  index,
  align
}) => {
  return (
    <Container className={`col-${index}`} {...{ align }}>
      {title}

      {/* {sortIndicator === 'asc' && (
        <OrderIndicatorContainer>
          <MdArrowDropDown size={24} />
        </OrderIndicatorContainer>
      )}

      {sortIndicator === 'desc' && (
        <OrderIndicatorContainer>
          <MdArrowDropUp size={24} />
        </OrderIndicatorContainer>
      )} */}
    </Container>
  )
}

export default Cell
