import styled from 'styled-components'

export const Wrapper = styled.div`
  flex: 1;
  padding: 2px 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`
