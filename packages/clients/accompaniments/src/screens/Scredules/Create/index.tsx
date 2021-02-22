import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { format } from 'date-fns'
import { remote } from 'electron'
import { useFormValidatorRef } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import { extractErrorMessage, useAxios } from '@shared/axios'
import { Checkbox } from '@shared/web-components'
import {
  SubmitButton,
  DateInput,
  ActionsContainer,
  BuyerInput,
  RepresentativeInput,
  IBuyer,
  SelectInput
} from '@shared/web-components/Form'
import { IRepresentative } from '@shared/web-components/Form/Inputs/RepresentativeInput/types'

import { useTypedSelector } from '~/store'
import { createAgendaRequest } from '~/store/modules/agenda/actions'
import { Types } from '~/store/modules/agenda/types'
import { closeWindow } from '~/utils/close-window'

import { normalizeDate } from '../context'
import { RepresentedInput } from './RepresentedInput'
import { IRepresentedProvider } from './RepresentedInput/Represented/types'
import { schema } from './schema'
import { Wrapper, Container } from './styles'
import { IFormData, IAvailableHour } from './types'

const CreateScheduleScreen: React.VFC = () => {
  const [api] = useAxios()
  const dispatch = useDispatch()

  const { additingAgenda } = useTypedSelector(state => state.agenda)

  const [formRef, validateForm] = useFormValidatorRef(schema)

  const [isShowAllRepresentatives, setShowAllRepresentatives] = useState(false)
  const [isHideBranches, setHideBranches] = useState(true)

  const [buyers, setBuyers] = useState<IBuyer[]>([])
  const [representative, setRepresentative] = useState<IRepresentative>()
  const [representeds, setRepresenteds] = useState<IRepresentedProvider[]>([])
  const [date, setDate] = useState<Date>()

  const [isLoadingHours, setLoadingHours] = useState<boolean>(false)
  const [availableHours, setAvailableHours] = useState<IAvailableHour[]>([])

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      console.log({ data })

      const { success, errors } = await validateForm()

      if (!success) {
        console.error(errors)

        return
      }

      const { end, start } = availableHours[data.hour]

      dispatch(
        createAgendaRequest({
          buyer: data.buyer[0].code,
          providers: data.representeds.map(({ code }) => code),
          agendaFrom: normalizeDate(start),
          agendaTo: normalizeDate(end)
        })
      )
    },
    [validateForm, availableHours, representeds, dispatch]
  )

  useEffect(() => {
    async function loadAvailableHours() {
      setLoadingHours(true)

      try {
        const { data } = await api.post<IAvailableHour[]>(
          `/agenda/${buyers[0].code}/availableHours`,
          {
            date,
            providerCount: representeds.length
          }
        )

        setAvailableHours(data)
      } catch (error) {
        const message = extractErrorMessage(error)

        remote?.dialog.showErrorBox(
          'Erro ao calcular horários disponíveis',
          String(message)
        )
      } finally {
        setLoadingHours(false)
      }
    }

    if (date && buyers.length !== 0 && representeds.length !== 0) {
      loadAvailableHours()
    } else {
      setAvailableHours([])
      setLoadingHours(false)
    }
  }, [buyers, date, representeds, api])

  useWatchAction(closeWindow, Types.CREATE_AGENDA_SUCCESS)

  return (
    <Wrapper onSubmit={handleSubmit} ref={formRef}>
      <Container>
        <BuyerInput
          name="buyer"
          label="Comprador"
          onBuyersChange={setBuyers}
          single
        />

        <RepresentativeInput
          name="representative"
          label="Representante"
          onRepresentativeChange={setRepresentative}
          showAllRepresentatives={isShowAllRepresentatives}
          buyer={buyers[0]}
          disabled={!buyers[0]}
        />

        <Checkbox
          label="Exibir todos os representantes"
          value={isShowAllRepresentatives}
          onValueChange={setShowAllRepresentatives}
        />

        <RepresentedInput
          name="representeds"
          label="Representadas"
          onRepresentedChanges={setRepresenteds}
          representative={representative}
          hideBranches={isHideBranches}
          disabled={!representative}
        />

        <Checkbox
          label="Ocultar filiais"
          value={isHideBranches}
          onValueChange={setHideBranches}
        />

        <DateInput
          name="date"
          label="Data"
          position="top"
          onDateChange={setDate}
          inputProps={{ disabled: representeds.length === 0 }}
        />

        <SelectInput
          name="hour"
          label="Horário"
          clearOnOptionsChange
          inputProps={{
            options: availableHours.map(({ start, end }, i) => ({
              label: `${format(normalizeDate(start), 'HH:mm')} - ${format(
                normalizeDate(end),
                'HH:mm'
              )}`,
              value: i
            })),
            isDisabled: availableHours.length === 0 || isLoadingHours,
            menuPlacement: 'top'
          }}
        />
      </Container>

      <ActionsContainer>
        <SubmitButton label="Criar Agendamento" loading={additingAgenda} />
      </ActionsContainer>
    </Wrapper>
  )
}

export { CreateScheduleScreen }
