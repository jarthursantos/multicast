import styled from 'styled-components'

export const Wrapper = styled.div`
  grid-area: CALENDAR;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(100vh - 40px - 154px) 40px;
  grid-template-areas:
    'DATA'
    'TOTAL';

  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const Container = styled.div`
  grid-area: DATA;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  overflow-y: scroll;
  padding: 16px;

  & > * + * {
    margin-top: 12px;
  }
`

export const TotalWrapper = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 14px;
  font-weight: 500;
  grid-area: TOTAL;
  width: 620px;
`

export const Total = styled.div`
  color: ${({ theme }) => theme.colors.text.primary.dark};
  font-weight: bold;
  font-size: 16px;
`
