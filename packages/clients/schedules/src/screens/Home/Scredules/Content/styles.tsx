import React from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

import styled from 'styled-components'

import { useWindowSize } from '~/hooks/use-window-size'

export const Wrapper = styled.div`
  grid-area: CONTENT;

  & > * {
    height: 100%;
    max-height: 100%;
  }
`

export const Container = styled.div`
  overflow: none;

  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: calc(100vw - 300px);
  grid-template-areas:
    'RESIZABLE'
    'NESTED';

  .react-resizable {
    position: relative;
  }

  .react-resizable-handle {
    position: absolute;
    width: 12px;
    height: 12px;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
    background-position: bottom right;
    padding: 0 3px 3px 0;
  }

  .react-resizable-handle-w {
    top: 50%;
    margin-top: -10px;
    cursor: ew-resize;
    left: 3px;
    transform: rotate(135deg);
  }

  .react-resizable-handle-s {
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
    bottom: 3px;
    transform: rotate(45deg);
  }
`

export const NestedWrapper = styled.div`
  grid-area: NESTED;

  overflow: hidden;
  width: 100%;
  height: 100%;
`

const ResizableWrapperComponent = styled(ResizableBox).attrs({
  resizeHandles: ['s'],
  axis: 'y',
  minConstraints: [Infinity, 150]
})`
  grid-area: RESIZABLE;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 100%;

  border-bottom: 1px solid #bbb;
  padding-bottom: 16px;
  width: 100%;

  & > div {
    border-bottom: 1px solid #bbb;
  }
`

export const ResizableWrapper: React.FC<Pick<
  ResizableBoxProps,
  'height' | 'width'
>> = ({ children, ...rest }) => {
  const windowSize = useWindowSize()

  return (
    <ResizableWrapperComponent
      {...rest}
      maxConstraints={[Infinity, windowSize.height - 125 - 30 - 150]}
    >
      {children}
    </ResizableWrapperComponent>
  )
}

interface ISideResizableWrapperProps
  extends Pick<ResizableBoxProps, 'height' | 'width'> {
  hidden?: boolean
}

const SideResizableWrapperComponent = styled(ResizableBox).attrs({
  resizeHandles: ['w'],
  axis: 'x',
  minConstraints: [150, Infinity],
  maxConstraints: [400, Infinity]
})`
  border-left: 1px solid #bbb;
  padding-left: 16px;

  & > div {
    border-left: 1px solid #bbb;
  }
`

export const SideResizableWrapper: React.FC<ISideResizableWrapperProps> = ({
  hidden,
  children,
  ...rest
}) => {
  if (hidden) {
    return <React.Fragment />
  }

  return (
    <SideResizableWrapperComponent {...rest}>
      {children}
    </SideResizableWrapperComponent>
  )
}
