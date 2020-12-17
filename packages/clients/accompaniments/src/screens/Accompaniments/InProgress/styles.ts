import ScrollBar from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 88px calc(100vh - 88px - 30px - 125px);
  grid-template-areas:
    'HEADER'
    'CONTENT';
`

export const Header = styled(ScrollBar)`
  grid-area: HEADER;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};

  display: flex;
  align-items: center;
  padding: 0 16px;

  & > * {
    padding-right: 16px;
  }
`
