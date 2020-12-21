import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import {
  DateInput,
  CheckboxInput,
  TextInput,
  SelectInput,
  SubmitButton
} from '@shared/web-components'

import { useTypedSelector } from '~/store'
import { addScheduleRequest } from '~/store/modules/schedules/actions'
import { ICreateScheduleData, Types } from '~/store/modules/schedules/types'
import { closeWindow } from '~/utils/close-window'

import { storeSchema } from './schema'
import { Wrapper, Container, ActionsWrapper, Inline } from './styles'

const CreateScheduleScreen: React.VFC = () => {
  const dispatch = useDispatch()
  const [formRef, validateForm] = useFormValidatorRef(storeSchema)

  const { additingSchedule } = useTypedSelector(state => state.schedules)

  const handleSubmit = useCallback(
    async (data: ICreateScheduleData) => {
      const { success } = await validateForm()

      if (!success) return

      dispatch(addScheduleRequest(data))
    },
    [validateForm, dispatch]
  )

  useWatchAction(closeWindow, [Types.ADD_SCHEDULES_SUCCESS])

  return (
    <Wrapper
      onSubmit={handleSubmit}
      ref={formRef}
      initialData={{ freightType: 'CIF', vehicleType: 'EXTERNAL' }}
    >
      <Container>
        <DateInput name="scheduledAt" label="Data do Agendamento" />

        <CheckboxInput name="priority" label="Agendamento Prioritário" />

        <TextInput
          name="shippingName"
          label="Razão Social/Fantasia da Transportadora"
        />

        <Inline>
          <SelectInput
            name="freightType"
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
            name="vehicleType"
            label="Tipo do Veículo"
            inputProps={{
              menuPosition: 'fixed',
              options: [
                { label: 'Externo', value: 'EXTERNAL' },
                { label: 'Interno', value: 'INTERNAL' }
              ]
            }}
          />
        </Inline>
      </Container>

      <ActionsWrapper>
        <SubmitButton
          label="Adicionar Agendamento"
          loading={additingSchedule}
        />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { CreateScheduleScreen }
