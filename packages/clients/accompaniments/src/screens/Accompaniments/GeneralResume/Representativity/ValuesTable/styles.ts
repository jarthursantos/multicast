import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  .tab {
    flex: 1;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;

    strong {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.text.secondary.dark};
      margin-left: 12px;
      padding: 2px 4px;
      border-radius: 4px;
      transition: all 0.2s ease-in-out;
    }

    &:hover {
      strong {
        background-color: #aaa;
        color: #fff;
      }
    }
  }

  .count {
    width: 150px;
    text-align: right;
  }

  .amount {
    width: 180px;
    text-align: right;
  }

  .delivered {
    width: 180px;
    text-align: right;
  }

  & > .row + .row {
    border-top: none;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;

  background: #f0f0f0;
  border: 2px solid ${({ theme }) => theme.colors.border.secondary};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: none;

  & > * + * {
    border-left: 2px solid ${({ theme }) => theme.colors.border.secondary};
  }
`

export const HeaderLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px 8px 0;
`

export const Row = styled.div.attrs({
  className: 'row'
})`
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 2px solid ${({ theme }) => theme.colors.border.secondary};

  .count {
    width: 152px;
    text-align: right;
  }

  & > * + * {
    border-left: 2px solid ${({ theme }) => theme.colors.border.secondary};
  }
`

export const CellLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 14px;
  padding: 8px 12px;
`

export const FirstRow = styled(Row)`
  border-top-left-radius: 8px;
`

export const LastRow = styled(Row)`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
