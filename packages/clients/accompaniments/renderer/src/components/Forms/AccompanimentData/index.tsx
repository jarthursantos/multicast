import React from 'react'

import { NumberInput, DateInput } from '@shared/web-components/Form'

import { Container, Inline } from '../styles'
import { InvoiceContainer } from './styles'
import { AccompanimentDataProps } from './types'

const AccompanimentData: React.VFC<AccompanimentDataProps> = ({
  disabled,
  isFreeOnBoard
}) => {
  return (
    <Container>
      <h3>Dados do Andamento</h3>

      <DateInput
        name="releasedAt"
        label="Liberação para Faturamento"
        inputProps={{ disabled, readOnly: true }}
      />

      <DateInput
        name="expectedBillingAt"
        label="Previsão do Faturamento"
        inputProps={{ disabled }}
      />

      <InvoiceContainer disabled={disabled}>
        <h3>Nota Fiscal</h3>

        <DateInput name="emittedAt" label="Emissão" inputProps={{ disabled }} />

        <Inline>
          <NumberInput name="number" label="Número" inputProps={{ disabled }} />
          <NumberInput name="value" label="Valor" inputProps={{ disabled }} />
        </Inline>
      </InvoiceContainer>

      <DateInput
        name="freeOnBoardAt"
        label="FOB SP"
        inputProps={{ disabled: disabled || !isFreeOnBoard }}
      />

      <DateInput
        name="schedulingAt"
        label="Previsão do Agendamento"
        inputProps={{ disabled }}
      />
    </Container>
  )
}

export default AccompanimentData
