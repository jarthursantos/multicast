import styled from 'styled-components'

export const Container = styled.div`
  grid-area: 'TABOPTIONS';

  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`
