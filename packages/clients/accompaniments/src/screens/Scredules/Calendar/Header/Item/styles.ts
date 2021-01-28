import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 16px;
`

export const Title = styled.strong`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 15px;
`
