import styled from 'styled-components'

export const Container = styled.div`
  cursor: pointer;
  text-decoration: inherit;
  display: inline-block;

  color: ${({ theme }) => theme.colors.text.secondary.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
  min-width: 100%;
  white-space: nowrap;

  :hover {
    background: rgba(219, 68, 55, 0.1);
    color: #db4437;
  }
`
