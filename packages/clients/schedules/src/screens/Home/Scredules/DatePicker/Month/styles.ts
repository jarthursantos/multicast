import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 0 16px 16px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const Letter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 13px;
  font-weight: 500;
  height: 40px;
  width: 40px;
`
