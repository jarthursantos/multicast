import React from 'react'

import { NumberInput, DateInput } from '@shared/web-components/Form'

import { Container, Inline } from '../styles'
import { AccompanimentDataProps } from './types'

const AccompanimentData: React.VFC<AccompanimentDataProps> = ({ disabled }) => {
  return (
    <Container>
      <h3>Dados do Andamento</h3>

      <DateInput
        name="releasedAt"
        label="Liberação para Faturamento"
        inputProps={{ disabled }}
      />

      <DateInput
        name="expectedBillingAt"
        label="Previsão do Faturamento"
        inputProps={{ disabled }}
      />

      <DateInput
        name="billedAt"
        label="Arquivo XML / Faturamento"
        inputProps={{ disabled }}
      />

      <Inline>
        <NumberInput
          name="invoice.number"
          label="Nº Nota Fiscal"
          inputProps={{ disabled }}
        />
        <DateInput
          name="invoice.value"
          label="Valor Nota Fiscal"
          inputProps={{ disabled }}
        />
      </Inline>

      <DateInput
        name="freeOnBoardAt"
        label="FOB SP"
        inputProps={{ disabled }}
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
