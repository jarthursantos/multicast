import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: calc(100vh - 30px - 125px);
  grid-template-areas: 'SELECTOR REPORT';

  height: 100%;
  width: 100%;
`

export const Container = styled.div`
  grid-area: REPORT;
`
