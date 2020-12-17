import styled from 'styled-components'

import { Form } from '@shared/web-components/Form'

export const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;

  height: 100%;
`

export const Container = styled.div`
  height: 100%;
  padding: 16px;

  & > * + * {
    margin-top: 8px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid #bbb;
  padding: 8px 16px;
  margin: 0;
`
