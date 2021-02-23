import React from 'react'

import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { useBillsToPayOfDay } from '../context'
import { Bill } from './Bill'
import { Wrapper, Container, TotalWrapper, Total } from './styles'

const PendingBills: React.VFC = () => {
  const bills = useBillsToPayOfDay()
  return (
    <Wrapper>
      <Container>
        {bills.map((bill, index) => (
          <Bill key={index} bill={bill} />
        ))}
      </Container>

      <TotalWrapper>
        Total
        <Total>
          {formatPrice(bills.reduce((total, { value }) => total + value, 0))}
        </Total>
      </TotalWrapper>
    </Wrapper>
  )
}

export { PendingBills }
