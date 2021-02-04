import styled from 'styled-components'

import { Form } from '@shared/web-components/Form'

export const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;

  height: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px;
  flex: 1;

  margin: 0;
  & > * + * {
    margin-top: 8px;
  }
`
