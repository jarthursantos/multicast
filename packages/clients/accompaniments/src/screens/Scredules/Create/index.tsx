import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { setHours, setMinutes } from 'date-fns'
import { useFormValidatorRef } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import {
  SubmitButton,
  DateInput,
  ActionsContainer,
  BuyerInput,
  RepresentativeInput,
  IBuyer
} from '@shared/web-components/Form'
import { IRepresentative } from '@shared/web-components/Form/Inputs/RepresentativeInput/types'

import { useTypedSelector } from '~/store'
import { createAgendaRequest } from '~/store/modules/agenda/actions'
import { Types } from '~/store/modules/agenda/types'
import { closeWindow } from '~/utils/close-window'

import { RepresentedInput } from './RepresentedInput'
import { schema } from './schema'
import { Wrapper, Container } from './styles'
import { FormData } from './types'

const CreateScheduleScreen: React.VFC = () => {
  const dispatch = useDispatch()

  const { additingAgenda } = useTypedSelector(state => state.agenda)

  const [formRef, validateForm] = useFormValidatorRef(schema)

  const [buyers, setBuyers] = useState<IBuyer[]>([])
  const [representative, setRepresentative] = useState<IRepresentative>()

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const { success, errors } = await validateForm()

      if (!success) {
        console.error(errors)

        return
      }

      const { startTime, endTime } = data

      const agendaFrom = setHours(
        setMinutes(data.date, startTime.minute),
        startTime.hour
      )
      const agendaTo = setHours(
        setMinutes(data.date, endTime.minute),
        endTime.hour
      )

      dispatch(
        createAgendaRequest({
          buyer: data.buyer[0].code,
          providers: data.providers.map(({ code }) => code),
          agendaFrom,
          agendaTo
        })
      )
    },
    [validateForm, dispatch]
  )

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
          buyer={buyers[0]}
          disabled={!buyers[0]}
        />

        <RepresentedInput
          name="representeds"
          label="Representadas"
          representative={representative}
          disabled={!representative}
        />

        <DateInput name="date" label="Data" />
      </Container>

      <ActionsContainer>
        <SubmitButton label="Criar Agendamento" loading={additingAgenda} />
      </ActionsContainer>
    </Wrapper>
  )
}

export { CreateScheduleScreen }
