import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 16px;
  height: 41px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const Title = styled.strong`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 15px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
