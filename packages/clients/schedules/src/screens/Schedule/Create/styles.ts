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
