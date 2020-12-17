import styled from 'styled-components'

import {} from '@shared/web-components/Ribbon/Wrapper/styles'

export const Wrapper = styled.div`
  display: grid;

  grid-template-columns: 300px calc(100vw - 300px);
  grid-template-rows: calc(100vh - 125px - 30px);
  grid-template-areas: 'DATEPICKER CONTENT';
`
