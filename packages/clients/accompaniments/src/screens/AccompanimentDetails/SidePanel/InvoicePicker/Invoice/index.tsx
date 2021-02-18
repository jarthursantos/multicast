import React from 'react'

import { formatPriceWithoutSymbol } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { Wrapper, Container, Title, Value, SituationWrapper } from './styles'
import { IInvoiceProps } from './types'

const Invoice: React.VFC<IInvoiceProps> = ({ invoice }) => {
  return (
    <Wrapper>
      <Container>
        <Title>{invoice ? invoice.number : 'Saldo Pendente'}</Title>
        {invoice && <Value>R$ {formatPriceWithoutSymbol(invoice.value)}</Value>}
      </Container>

      <SituationWrapper>A Enviar</SituationWrapper>
    </Wrapper>
  )
}

export { Invoice }
