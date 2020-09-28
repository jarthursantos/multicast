import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 48px calc(100vh - 48px);
  grid-template-areas:
    'HEADER'
    'CONTENT';
`

export const Header = styled.div`
  grid-area: HEADER;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const Container = styled.div`
  grid-area: CONTENT;
  display: flex;
`
