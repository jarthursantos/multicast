import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;

  grid-template-columns: 300px calc(100vw - 300px);
  grid-template-rows: calc(100vh - 154px);
  grid-template-areas: 'DATEPICKER CALENDAR';

  height: 100%;
  width: 100%;

  *.rbc-current-time-indicator,
  *.rbc-allday-cell,
  *.rbc-time-header {
    display: none;
  }

  *.rbc-time-content {
    border-top: none;
  }
`

export const Container = styled.div`
  grid-area: DATEPICKER;
`
