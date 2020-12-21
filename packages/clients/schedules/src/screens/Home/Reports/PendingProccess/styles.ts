import styled from 'styled-components'

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 491px 10px calc(100vw - 501px);
  grid-template-rows: calc(100vh - 155px);
  grid-template-areas: 'SCHEDULES . INVOICES';

  height: 100%;
`

export const SchedulesWrapper = styled.div`
  grid-area: SCHEDULES;

  height: 100%;
  border-right: 1px solid #bbb;
`

export const InvoicesWrapper = styled.div`
  grid-area: INVOICES;
  border-left: 1px solid #bbb;
`
