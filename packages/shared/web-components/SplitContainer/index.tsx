import React from 'react'

import { Wrapper, ResizableWrapper, RemainingWrapper } from './styles'
import { SpliContainerProps } from './types'

const SplitContainer: React.VFC<SpliContainerProps> = ({
  children,
  resizeWidth = 300,
  resizeLocation = 'left'
}) => {
  return (
    <Wrapper>
      {React.Children.map(children, (child, index) =>
        index === 0 ? (
          <ResizableWrapper>{child}</ResizableWrapper>
        ) : (
          <RemainingWrapper>{child}</RemainingWrapper>
        )
      )}
    </Wrapper>
  )
}

export { SplitContainer }
