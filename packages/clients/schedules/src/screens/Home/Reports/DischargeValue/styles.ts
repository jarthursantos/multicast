import styled from 'styled-components'

import { Form } from '@shared/web-components'

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px calc(100vw - 300px);
  grid-template-rows: calc(100vh - 155px);
  grid-template-areas: 'FORM REPORT';
`

export const FormWrapper = styled(Form)`
  grid-area: FORM;
  padding: 16px;
  border-right: 1px solid #bbb;

  display: flex;
  flex-direction: column;

  & > div + div {
    margin-top: 8px;
  }
`

export const ReportWrapper = styled.div`
  grid-area: REPORT;

  display: flex;

  & > * {
    flex: 1;
  }
`
