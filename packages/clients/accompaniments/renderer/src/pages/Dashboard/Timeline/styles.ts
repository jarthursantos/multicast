import styled from 'styled-components'

export const Wrapper = styled.div`
  #number {
    width: 60px;
  }

  #providerCode {
    width: 50px;
  }

  #providerName {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #fantasy {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #invoice {
    width: 80px;
  }

  #emittedAt {
    width: 80px;
  }

  #situation {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #observation {
    width: 25px;
    text-align: center;
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px 16px;
  margin-left: 6px;

  & > * + * {
    margin-left: 8px;
  }
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

  & > * + * {
    margin-left: 8px;
  }
`

export const ItemLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 13px;
  text-transform: uppercase;
`
