import ScrollBarBase from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const ScrollBar = styled(ScrollBarBase)``

export const Content = styled.div`
  height: 368px;

  & > * + * {
    margin-top: 12px;
  }
`
