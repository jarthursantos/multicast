import { ResizableBox } from 'react-resizable'

import styled from 'styled-components'

export const Container = styled(ResizableBox).attrs({
  resizeHandles: ['w'],
  axis: 'x'
})`
  height: 100%;
  padding: 24px;
  border-left: 1px solid ${props => props.theme.colors.border.primary};
  display: flex;
  flex-direction: column;
`
