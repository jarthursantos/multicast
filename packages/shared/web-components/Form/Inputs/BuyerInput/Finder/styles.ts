import { Form } from '@unform/web'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const TableWrapper = styled.div`
  height: calc(100vh - 140px);
`

export const FieldsWrapper = styled(Form)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  border-bottom: 1px solid #bbb;
  padding: 16px;

  & > div {
    flex: 1;
  }

  & > button {
    height: 40px;
    width: 40px;
    margin-left: 12px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  border-top: 1px solid #bbb;
  padding: 8px 16px;
`
