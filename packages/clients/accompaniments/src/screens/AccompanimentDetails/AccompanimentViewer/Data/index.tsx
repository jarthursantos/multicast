import React from 'react'

import { Form } from '@shared/web-components'
import { DateInput, SelectInput } from '@shared/web-components/Form'

import { Wrapper, Container } from './styles'
import { AccompanimentDataProps } from './types'

const Data: React.VFC<AccompanimentDataProps> = ({
  disabled,
  isFreeOnBoard,
  options
}) => {
  return (
    <Wrapper>
      <Form onSubmit={console.log}>
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
            name="billingAt"
            label="Arquivo XML"
            inputProps={{ disabled }}
          />

          <SelectInput
            name="transactionNumber"
            label="Nota Fiscal"
            inputProps={{
              noOptionsMessage: () => 'Nenhuma Nota Encontrada',
              isClearable: options?.length !== 0,
              isDisabled: disabled,
              isLoading: !options,
              options
            }}
          />

          <DateInput
            name="freeOnBoardAt"
            label="FOB SP"
            position="top"
            inputProps={{ disabled: disabled || !isFreeOnBoard }}
          />

          <DateInput
            name="schedulingAt"
            label="Previsão do Agendamento"
            position="top"
            inputProps={{ disabled }}
          />
        </Container>
      </Form>
    </Wrapper>
  )
}

export { Data }
