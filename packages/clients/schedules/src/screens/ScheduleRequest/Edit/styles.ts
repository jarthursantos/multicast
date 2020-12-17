import styled from 'styled-components'

import { Form } from '@shared/web-components'

export const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;

  height: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 16px;

  & > * + * {
    margin-top: 8px;
  }

  hr {
    border: none;
    border-top: 1px dotted #bbb;
    margin: 16px 8px;
    margin-bottom: 8px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid #bbb;
  padding: 8px 16px;
  margin: 0;

  & > button + button {
    margin-left: 8px;
  }
`

export const FillSpace = styled.div`
  flex: 1;
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
