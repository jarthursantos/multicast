import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import {
  Button,
  SubmitButton,
  ProviderInput,
  DateInput,
  CheckboxInput,
  SelectInput,
  IProvider
} from '@shared/web-components'

import { useTypedSelector } from '~/store'
import {
  removeScheduleRequestRequest,
  updateScheduleRequestRequest
} from '~/store/modules/schedule-requests/actions'
import {
  IScheduleRequest,
  IUpdateScheduleRequestSuccessAction,
  IRemoveScheduleRequestSuccessAction,
  Types
} from '~/store/modules/schedule-requests/types'
import { closeWindow } from '~/utils/close-window'

import { updateSchema } from './schema'
import { Wrapper, Container, ActionsWrapper, FillSpace, Inline } from './styles'
import { IEditScheduleRequestScreenProps } from './types'

interface IRawScheduleRequest
  extends Omit<IScheduleRequest, 'provider' | 'id'> {
  providers: IProvider[]
}

const EditScheduleRequestScreen: React.VFC<IEditScheduleRequestScreenProps> = ({
  scheduleRequest
}) => {
  const dispatch = useDispatch()
  const [formRef, validateForm] = useFormValidatorRef(updateSchema)

  const { updatingScheduleRequest, removingScheduleRequest } = useTypedSelector(
    state => state.scheduleRequests
  )

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

      if (!success || !scheduleRequest) return

      dispatch(
        updateScheduleRequestRequest(scheduleRequest, {
          requestedDate: data.requestedDate,
          providerCode: data.providers[0].code
        })
      )
    },
    [scheduleRequest, dispatch, validateForm]
  )

  const handleRemove = useCallback(() => {
    if (!scheduleRequest) return

    dispatch(removeScheduleRequestRequest(scheduleRequest))
  }, [scheduleRequest, dispatch])

  useEffect(() => {
    if (scheduleRequest) {
      formRef.current?.setFieldValue('providers', [scheduleRequest.provider])
    }
  }, [formRef, scheduleRequest])

  useWatchAction<IUpdateScheduleRequestSuccessAction>(
    ({ payload }) => {
      if (payload.scheduleRequest.id === scheduleRequest.id) {
        closeWindow()
      }
    },
    Types.UPDATE_SCHEDULE_REQUESTS_SUCCESS,
    [scheduleRequest]
  )

  useWatchAction<IRemoveScheduleRequestSuccessAction>(
    ({ payload }) => {
      if (payload.scheduleRequest.id === scheduleRequest.id) {
        closeWindow()
      }
    },
    Types.REMOVE_SCHEDULE_REQUESTS_SUCCESS,
    [scheduleRequest]
  )

  return (
    <Wrapper
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={scheduleRequest}
    >
      <Container>
        <DateInput
          name="requestedDate"
          label="Data solicitada"
          inputProps={{ autoFocus: true }}
        />

        <ProviderInput name="providers" label="Fornecedor" single />

        <hr />

        <CheckboxInput name="priority" label="Agendamento Prioritário" />

        <Inline>
          <SelectInput
            name="freight"
            label="Tipo do Frete"
            inputProps={{
              menuPosition: 'fixed',
              options: [
                { label: 'CIF', value: 'CIF' },
                { label: 'FOB', value: 'FOB' }
              ]
            }}
          />

          <SelectInput
            name="vehicle"
            label="Tipo do Veículo"
            inputProps={{
              menuPosition: 'fixed',
              options: [
                { label: 'Externo', value: 'Externo' },
                { label: 'Interno', value: 'Interno' }
              ]
            }}
          />
        </Inline>
      </Container>

      <ActionsWrapper>
        <Button
          onClick={handleRemove}
          label="Remover"
          loading={removingScheduleRequest}
          secondary
        />

        <FillSpace />

        <Button label="Agendar" />

        <SubmitButton label="Atualizar" loading={updatingScheduleRequest} />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { EditScheduleRequestScreen }
