import ScrollBarBase from 'react-perfect-scrollbar'

import styled from 'styled-components'

import { Form } from '@shared/web-components/Form'

export const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const ScrollBar = styled(ScrollBarBase)`
  height: calc(100vh - 56px);
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px;

  h2 {
    color: #333;
    font-size: 16px;
  }

  h3 {
    color: #666;
    font-size: 13px;
  }

  & > * + * {
    margin-top: 16px;
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  height: 56px;
  margin-top: 0px;
  padding: 0 16px;
`

export const InlineContainer = styled.div`
  display: flex;
  flex-direction: row;

  #industry,
  #name,
  #value,
  #onus,
  #onusType {
    flex: 1;
  }

  #account,
  #agence {
    width: 120px;
  }

  #taxOption {
    width: 200px;
  }

  #establishment {
    width: 150px;
  }

  & > * + * {
    margin-left: 12px;
  }
`
