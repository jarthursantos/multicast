import React, { useState, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { setHours, setMinutes } from 'date-fns'
import { useFormValidatorRef } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import {
  SubmitButton,
  DateInput,
  ProviderInput,
  ActionsContainer,
  BuyerInput,
  RepresentativeInput,
  TimeInput,
  ITime,
  IProvider,
  IBuyer
} from '@shared/web-components/Form'

import { useTypedSelector } from '~/store'
import { createAgendaRequest } from '~/store/modules/agenda/actions'
import { Types } from '~/store/modules/agenda/types'
import { closeWindow } from '~/utils/close-window'

import { schema } from './schema'
import {
  Wrapper,
  Container,
  HourPickerWrapper,
  DurationIndicatorWrapper,
  DurationIndicatorContainer,
  DurationIndicatorSituation
} from './styles'
import { FormData } from './types'

function formatDuration(hour = 0, minute = 0): string {
  return `${hour <= 9 ? '0' : ''}${hour}:${
    minute <= 9 ? '0' : ''
  }${minute}`.replace('00:00', '--:--')
}

const CreateScheduleScreen: React.VFC = () => {
  const dispatch = useDispatch()

  const { additingAgenda } = useTypedSelector(state => state.agenda)

  const [startTime, setStartTime] = useState<ITime>()
  const [endTime, setEndTime] = useState<ITime>()

  const [formRef, validateForm] = useFormValidatorRef(schema)

  const [buyers, setBuyers] = useState<IBuyer[]>([])
  const [providers, setProviders] = useState<IProvider[]>([])

  const recommendedDuration = useMemo<ITime>(() => {
    const duration = Math.min(providers.length * 30, 4 * 60)

    const hour = parseInt(`${duration / 60}`)
    const minute = duration - hour * 60

    return { hour, minute }
  }, [providers])

  const currentDuration = useMemo<ITime>(() => {
    const startMinutes = (startTime?.hour || 0) * 60 + (startTime?.minute || 0)
    const endMinutes = (endTime?.hour || 0) * 60 + (endTime?.minute || 0)

    if (startMinutes > endMinutes) {
      return { hour: 0, minute: 0 }
    }

    const currentMinutes = endMinutes - startMinutes

    const hour = parseInt(`${currentMinutes / 60}`)
    const minute = currentMinutes - hour * 60

    return { hour, minute }
  }, [startTime, endTime])

  const situation = useMemo<'valid' | 'invalid' | undefined>(() => {
    const recommendedMinutes =
      (recommendedDuration?.hour || 0) * 60 + (recommendedDuration?.minute || 0)
    const currentMinutes =
      (currentDuration?.hour || 0) * 60 + (currentDuration?.minute || 0)

    if (recommendedMinutes === 0 || currentMinutes === 0) {
      return undefined
    }

    return recommendedMinutes > currentMinutes ? 'invalid' : 'valid'
  }, [recommendedDuration, currentDuration])

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
        <DateInput name="date" label="Data" inputProps={{ autoFocus: true }} />

        <BuyerInput
          name="buyer"
          label="Comprador"
          onBuyersChange={setBuyers}
          single
        />

        <RepresentativeInput
          name="representative"
          label="Representante"
          buyer={buyers[0]}
          disabled={!buyers[0]}
        />

        <HourPickerWrapper>
          <TimeInput
            name="startTime"
            label="Início"
            onHourChange={setStartTime}
          />

          <TimeInput name="endTime" label="Término" onHourChange={setEndTime} />
        </HourPickerWrapper>

        <DurationIndicatorWrapper className={situation}>
          <DurationIndicatorContainer>
            <div>
              Duração Recomendada:{' '}
              <strong>
                {formatDuration(
                  recommendedDuration?.hour,
                  recommendedDuration?.minute
                )}
              </strong>
            </div>
            <div>
              Duração Atual:{' '}
              <strong>
                {formatDuration(currentDuration?.hour, currentDuration?.minute)}
              </strong>
            </div>
          </DurationIndicatorContainer>

          <DurationIndicatorSituation>
            {situation
              ? `A duração selecionada ${
                  situation === 'invalid' ? ' é inferior' : ' confere com'
                } a predefinida`
              : 'Preencha os campos acima para calcular a duração'}
          </DurationIndicatorSituation>
        </DurationIndicatorWrapper>
      </Container>

      <ActionsContainer>
        <SubmitButton label="Criar Agendamento" loading={additingAgenda} />
      </ActionsContainer>
    </Wrapper>
  )
}

export { CreateScheduleScreen }
