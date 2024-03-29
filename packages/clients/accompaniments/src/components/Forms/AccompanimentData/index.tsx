import React from 'react'

import { DateInput, SelectInput } from '@shared/web-components/Form'

import { Container } from '../styles'
import { AccompanimentDataProps } from './types'

const AccompanimentData: React.VFC<AccompanimentDataProps> = ({
  disabled,
  isFreeOnBoard,
  options,
  scheduled
}) => {
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

      {scheduled && (
        <>
          <h3>Dados do Agendamento/Recebimento</h3>
          <DateInput
            name="schedule.scheduledAt"
            label="Agendamento"
            inputProps={{ readOnly: true }}
          />
          <DateInput
            name="schedule.receivedAt"
            label="Recebimento"
            inputProps={{ readOnly: true }}
          />
          <DateInput
            name="schedule.downloadedAt"
            label="Descarregamento"
            inputProps={{ readOnly: true }}
          />
          <DateInput
            name="schedule.unlockedAt"
            label="Desbloqueio"
            inputProps={{ readOnly: true }}
          />
        </>
      )}
    </Container>
  )
}

export default AccompanimentData
