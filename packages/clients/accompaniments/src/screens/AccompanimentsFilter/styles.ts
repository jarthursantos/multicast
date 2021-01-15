import styled from 'styled-components'

import { Form } from '@shared/web-components'

export const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100%;

  hr {
    border: none;
    border-top: 1px dotted #bbb;
    margin: 8px;
  }
`

export const Container = styled.div`
  padding: 16px;
  height: 100%;
  overflow-y: auto;

  h3 {
    color: ${({ theme }) => theme.colors.text.secondary.dark};
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  & > * + * {
    margin-top: 8px;
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
export const Inline = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`
