import styled from 'styled-components'

import { Form } from '@shared/web-components'

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 345px calc(100vw - 345px);
  grid-template-rows: 100%;
  grid-template-areas: 'FORM INVOICES';

  height: 100%;
  width: 100%;
`

export const FormWrapper = styled(Form)`
  grid-area: FORM;

  display: flex;
  flex-direction: column;

  border-right: 1px solid #bbb;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px;
  height: 100%;

  & > * + * {
    margin-top: 8px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 8px 16px;
  border-top: 1px solid #bbb;
  margin: 0;

  & > button + button {
    margin-left: 8px;
  }
`

export const FillSpace = styled.div`
  flex: 1;
`

export const InvoicesWrapper = styled.div`
  grid-area: INVOICES;

  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`

export const Inline = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`
