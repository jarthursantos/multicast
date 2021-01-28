import styled from 'styled-components'

export const Wrapper = styled.div`
  grid-area: CALENDAR;

  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 40px 1fr;
  grid-template-areas:
    '. HEADER'
    'GUTTER TOPICS';

  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const Container = styled.div`
  grid-area: TOPICS;
  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};

  display: flex;
  flex-direction: row;

  & > * + * {
    /* border-left: 1px solid ${({ theme }) =>
      theme.colors.border.secondary}; */
  }
`
