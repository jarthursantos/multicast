import styled from 'styled-components'

import { Form } from '@shared/web-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  height: 350px;
  width: 500px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
`

export const FieldsWrapper = styled(Form)`
  display: flex;
  align-items: flex-end;
  padding: 0 16px 16px;
  border-bottom: 1px solid #bbb;

  & > div {
    flex: 1;
  }

  & > div + div {
    flex: 2;
    margin-left: 12px;
  }

  & > button {
    height: 40px;
    width: 40px;
    margin-left: 12px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid #bbb;
  padding: 8px 16px;
  margin: 0;
`
