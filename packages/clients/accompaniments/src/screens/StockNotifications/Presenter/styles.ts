import { ResizableBox } from 'react-resizable'

import styled from 'styled-components'

interface WrapperProps {
  groupWidth: number
}

export const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: ${({ groupWidth }) =>
    `${groupWidth}px 10px calc(100vw - ${groupWidth}px - 10px)`};
  grid-template-rows: calc(100vh - 30px - 125px);
  grid-template-areas: 'GROUP . PRODUCTS';
`

export const GroupWrapper = styled(ResizableBox).attrs({
  resizeHandles: ['e'],
  axis: 'x'
})`
  grid-area: GROUP;
  z-index: 1;
  background-color: #fff;
`

export const ProductsWrapper = styled.div`
  grid-area: PRODUCTS;
  border-left: 1px solid ${props => props.theme.colors.border.primary};

  & > * {
    height: 100%;
  }
`
