import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import {
  SubmitButton,
  ProviderInput,
  DateInput,
  IProvider
} from '@shared/web-components/Form'

import { useTypedSelector } from '~/store'
import { addScheduleRequestRequest } from '~/store/modules/schedule-requests/actions'
import {
  Types,
  IScheduleRequest
} from '~/store/modules/schedule-requests/types'
import { closeWindow } from '~/utils/close-window'

import { createSchema } from './schema'
import { Wrapper, Container, ActionsWrapper } from './styles'

interface IRawScheduleRequest
  extends Omit<IScheduleRequest, 'provider' | 'id'> {
  providers: IProvider[]
}

const CreateScheduleRequestScreen: React.VFC = () => {
  const dispatch = useDispatch()

  const { additingScheduleRequest } = useTypedSelector(
    state => state.scheduleRequests
  )
  const [formRef, validateForm] = useFormValidatorRef(createSchema)

  const handleSubmit = useCallback(
    async (data: IRawScheduleRequest) => {
      const { success } = await validateForm()

      if (data.providers.length !== 1) {
        formRef.current?.setFieldError(
          'providers',
          'É necessário um fornecedor'
        )

        return
      }

      if (!success) return

      dispatch(
        addScheduleRequestRequest({
          requestedDate: data.requestedDate,
          providerCode: data.providers[0].code
        })
      )
    },
    [dispatch, validateForm, formRef]
  )

  useWatchAction(closeWindow, Types.ADD_SCHEDULE_REQUESTS_SUCCESS)

  return (
    <Wrapper onSubmit={handleSubmit} ref={formRef}>
      <Container>
        <DateInput
          name="requestedDate"
          label="Data solicitada"
          inputProps={{ autoFocus: true }}
        />

        <ProviderInput name="providers" label="Fornecedor" single />
      </Container>

      <ActionsWrapper>
        <SubmitButton
          label="Adicionar Pré Agendamento"
          loading={additingScheduleRequest}
        />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { CreateScheduleRequestScreen }
