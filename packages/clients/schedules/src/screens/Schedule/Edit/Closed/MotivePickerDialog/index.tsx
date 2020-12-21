import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'

import { SubmitButton, TextInput, Button } from '@shared/web-components'

import { useTypedSelector } from '~/store'
import { cancelScheduleRequest } from '~/store/modules/schedules/actions'
import { ICancelScheduleData } from '~/store/modules/schedules/types'
import { modalStyles } from '~/styles/modal'

import { schema } from './schema'
import { Wrapper, Container, ActionsWrapper } from './styles'
import { IMotivePickerDialogHandles, IMotivePickerDialogProps } from './types'

const MotivePickerDialogComponent: React.ForwardRefRenderFunction<
  IMotivePickerDialogHandles,
  IMotivePickerDialogProps
> = ({ schedule }, ref) => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState<boolean>(false)

  const [formRef, validateForm] = useFormValidatorRef(schema)
  const { cancelingSchedules } = useTypedSelector(state => state.schedules)

  const handleOpen = useCallback(() => setOpened(true), [])
  const handleClose = useCallback(() => setOpened(false), [])

  const handleCancel = useCallback(
    async (data: ICancelScheduleData, _reset: any, event: React.FormEvent) => {
      event.stopPropagation()

      const { success } = await validateForm()

      if (!success) return

      dispatch(cancelScheduleRequest(schedule, data))
    },
    [schedule, dispatch, validateForm]
  )

  useImperativeHandle<{}, IMotivePickerDialogHandles>(
    ref,
    () => ({ open: handleOpen }),
    [handleOpen]
  )

  return (
    <Modal isOpen={opened} onRequestClose={handleClose} style={modalStyles}>
      <Wrapper onSubmit={handleCancel} ref={formRef}>
        <Container>
          <h1>Cancelar Agendamento</h1>

          <TextInput name="motive" label="Motivo" />
        </Container>

        <ActionsWrapper>
          <Button label="Fechar" onClick={handleClose} secondary />

          <SubmitButton
            label="Cancelar Agendamento"
            loading={cancelingSchedules}
          />
        </ActionsWrapper>
      </Wrapper>
    </Modal>
  )
}

export const MotivePickerDialog = forwardRef(MotivePickerDialogComponent)
export * from './types'
