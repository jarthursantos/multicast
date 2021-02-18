import React from 'react'

import { Invoice } from './Invoice'
import { Wrapper, Container } from './styles'

const InvoicePicker: React.FC = () => {
  return (
    <Wrapper>
      <h3>Sub Acompanhamentos</h3>

      <Container>
        <Invoice
          invoice={{ number: 1461, value: 1000, emittedAt: new Date() }}
        />

        <Invoice
          invoice={{ number: 9681, value: 1000, emittedAt: new Date() }}
        />

        <Invoice
          invoice={{ number: 64991, value: 1000, emittedAt: new Date() }}
        />

        <Invoice />
      </Container>
    </Wrapper>
  )
}

export { InvoicePicker }
