import styled from 'styled-components'

import { Form } from '@shared/web-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
`

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;

  border-right: 1px solid #bbb;
  height: 100%;
  width: 495px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 16px;

  & > * + * {
    margin-top: 8px;
  }
`

export const FillSpace = styled.div`
  flex: 1;
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid #bbb;
  margin: 0;
  padding: 8px 16px;

  & > button + button {
    margin-left: 8px;
  }
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

export const InlineCTE = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }

  & > * + * {
    flex: 2.1;
    margin-left: 12px;
  }
`
