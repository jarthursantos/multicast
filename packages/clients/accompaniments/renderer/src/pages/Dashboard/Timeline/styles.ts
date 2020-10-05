import styled from 'styled-components'

export const Wrapper = styled.div`
  #number {
    width: 70px;
  }

  #providerCode {
    width: 80px;
  }

  #providerName {
    flex: 1;
  }

  #fantasy {
    width: 150px;
  }

  #invoice {
    width: 80px;
  }

  #emittedAt {
    width: 90px;
  }

  #situation {
    width: 180px;
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px 16px;
  margin-left: 6px;
`

export const HeaderLabel = styled.small`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 12px;
`

export const BodyContainer = styled.ul`
  & > li + li {
    margin-top: 8px;
  }
`

export const Item = styled.li`
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  background: #eee;
  border-radius: 4px;
  padding: 12px 16px;

  border-left: 6px solid #1cda78;

  :hover {
    background: #e0e0e0;
  }

  &.alert {
    border-left: 6px solid #de2121;
  }

  &.warning {
    border-left: 6px solid #edce1a;
  }
`

export const ItemLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 13px;
  text-transform: uppercase;
`
