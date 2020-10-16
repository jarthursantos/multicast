import ScrollBar from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Wrapper = styled(ScrollBar)`
  grid-area: SELECTOR;

  border-right: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const Container = styled.ul`
  padding: 16px;

  & > li + li {
    margin-top: 8px;
  }
`
