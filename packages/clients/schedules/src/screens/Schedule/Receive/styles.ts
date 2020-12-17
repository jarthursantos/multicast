import styled from 'styled-components'

import { Form } from '@shared/web-components'

export const Wrapper = styled(Form)`
  display: grid;
  grid-template-columns: 345px calc(100vw - 345px);
  grid-template-rows: calc(100vh - 49px) 49px;
  grid-template-areas:
    'FORM RECEIPTS'
    'ACTIONS ACTIONS';
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px;
  height: 100%;

  border-right: 1px solid #bbb;

  hr {
    border: none;
    border-top: 1px dotted #bbb;
    margin: 16px 8px 8px;
  }

  h2 {
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }

  & > * + * {
    margin-top: 8px;
  }
`

export const ActionsWrapper = styled.div`
  grid-area: ACTIONS;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 16px;
  border-top: 1px solid #bbb;
  margin: 0;

  & > button + button {
    margin-left: 8px;
  }
`

export const ReceiptsWrapper = styled.div`
  grid-area: RECEIPTS;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0;
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
