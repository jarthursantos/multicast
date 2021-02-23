import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 2px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: 4px;
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.text.secondary.dark};

  min-width: 600px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-weight: 500;
`

export const ProviderWrapper = styled.div`
  font-size: 14px;
`

export const BuyerWrapper = styled.div`
  font-size: 13px;
`

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const Price = styled.div`
  grid-area: PRICE;

  font-weight: bold;
  font-size: 16px;
`

export const PriceDataContainer = styled.div`
  display: flex;

  & > * + * {
    margin-left: 6px;
  }
`

export const Installment = styled.div`
  font-size: 12px;
`

export const Deadline = styled.div`
  font-size: 12px;
`
