import React from 'react'

import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import {
  Wrapper,
  Container,
  ProviderWrapper,
  BuyerWrapper,
  PriceWrapper,
  Price,
  Installment,
  Deadline,
  PriceDataContainer
} from './styles'
import { IBillProps } from './types'

const Bill: React.VFC<IBillProps> = ({ bill }) => {
  return (
    <Wrapper>
      <Container>
        <ProviderWrapper>
          {bill.provider.name} - {bill.provider.code}
        </ProviderWrapper>
        <BuyerWrapper>
          {bill.buyer.name} - {bill.buyer.code}
        </BuyerWrapper>
      </Container>

      <PriceWrapper>
        <Price>{formatPrice(bill.value)}</Price>

        <PriceDataContainer>
          <Installment>{bill.installment}</Installment>

          <Deadline>{bill.deadline}</Deadline>
        </PriceDataContainer>
      </PriceWrapper>
    </Wrapper>
  )
}

export { Bill }
