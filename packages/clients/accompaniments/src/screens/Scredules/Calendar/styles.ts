import styled from 'styled-components'

export const Wrapper = styled.div`
  grid-area: CALENDAR;

  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'GUTTER TOPICS';

  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
  overflow: hidden;
`

export const Container = styled.div`
  grid-area: TOPICS;
  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};

  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`
