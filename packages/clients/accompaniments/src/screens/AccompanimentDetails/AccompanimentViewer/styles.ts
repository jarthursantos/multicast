import styled from 'styled-components'

import { ActionsContainer } from '@shared/web-components/Form'

export const Container = styled.div`
  grid-area: ACCOMPANIMENT_VIEWER;

  display: grid;
  grid-template-columns: calc(100vw - 400px - 300px);
  grid-template-rows: calc(100vh - 52px) 52px;
  grid-template-areas:
    'DATA OBSERVATIONS'
    'ACTIONS ACTIONS';
`

export const Actions = styled(ActionsContainer)`
  grid-area: ACTIONS;
  background-color: #fff;
`
