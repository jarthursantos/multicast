import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import {
  Button,
  SubmitButton,
  TextInput,
  SelectInput,
  MultipleProviderInput,
  NumberInput
} from '@shared/web-components'

import {
  applyScheduleFilters,
  clearScheduleFilters
} from '~/store/modules/schedules/actions'
import {
  IScheduleFilters,
  ScheduleSituations,
  Types
} from '~/store/modules/schedules/types'
import { closeWindow } from '~/utils/close-window'

import { Wrapper, Container, ActionsWrapper } from './styles'
import { IFilterScreenProps } from './types'

const FilterScreen: React.VFC<IFilterScreenProps> = ({ filters }) => {
  const dispatch = useDispatch()

  useEffect(() => console.log({ filters }), [filters])

  const handleSubmit = useCallback(
    (data: IScheduleFilters) => dispatch(applyScheduleFilters(data)),
    [dispatch]
  )

  const handleClearFilters = useCallback(
    () => dispatch(clearScheduleFilters()),
    [dispatch]
  )

  useWatchAction(closeWindow, [
    Types.APPLY_SCHEDULE_FILTERS,
    Types.CLEAR_SCHEDULE_FILTERS
  ])

  return (
    <Wrapper onSubmit={handleSubmit} initialData={filters} noValidate>
      <Container>
        <MultipleProviderInput name="providers" label="Fornecedor" />

        <hr />

        <SelectInput
          name="situation"
          label="Situação do Agendamento"
          inputProps={{
            menuPosition: 'fixed',
            maxMenuHeight: 150,
            isClearable: true,
            options: [
              { label: 'Em Aberto', value: ScheduleSituations.OPENED },
              { label: 'Agendado', value: ScheduleSituations.SCHEDULED },
              { label: 'Aguardando', value: ScheduleSituations.WAITING },
              { label: 'Não Recebido', value: ScheduleSituations.NON_RECEIVED },
              { label: 'Recebido', value: ScheduleSituations.RECEIVED },
              { label: 'Finalizado', value: ScheduleSituations.FINISHED },
              { label: 'Cancelado', value: ScheduleSituations.CANCELED },
              { label: 'Reagendado', value: ScheduleSituations.RESCHEDULED }
            ]
          }}
        />

        <TextInput
          name="shippingName"
          label="Razão Social/Fantasia da Transportadora"
        />

        <NumberInput name="invoiceNumber" label="Número da Nota Fiscal" />
      </Container>

      <ActionsWrapper>
        <Button onClick={handleClearFilters} label="Limpar Filtros" secondary />

        <SubmitButton label="Filtrar" />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { FilterScreen }
