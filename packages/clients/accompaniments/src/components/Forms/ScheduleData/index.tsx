import React from 'react'

import { DateInput } from '@shared/web-components/Form'

import { Container } from '../styles'

const AccompanimentData: React.VFC = () => {
  return (
    <Container>
      <h3>Dados do Agendamento</h3>

      <DateInput
        name="releasedAt"
        label="Liberação para Faturamento"
        inputProps={{ readOnly: true }}
      />

      <DateInput
        name="expectedBillingAt"
        label="Previsão do Faturamento"
        inputProps={{ readOnly: true }}
      />

      {/*
        <DateInput
          name="billingAt"
          label="Arquivo XML"
          inputProps={{ readOnly: true }}
        />

        <DateInput
          name="billingAt"
          label="Arquivo XML"
          inputProps={{ readOnly: true }}
        />
      */}
    </Container>
  )
}

export default AccompanimentData
