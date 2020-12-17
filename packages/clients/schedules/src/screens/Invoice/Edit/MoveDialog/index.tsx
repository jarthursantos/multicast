import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import { MdSearch } from 'react-icons/md'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'

import { remote } from 'electron'
import { useFormValidatorRef } from 'hookable-unform'

import { extractErrorMessage, useAxios } from '@shared/axios'
import {
  Button,
  TextInput,
  DateInput,
  SubmitButton
} from '@shared/web-components'

import { useTypedSelector } from '~/store'
import { moveScheduleInvoiceRequest } from '~/store/modules/schedules/actions'
import { ISchedule } from '~/store/modules/schedules/types'
import { modalStyles } from '~/styles/modal'

import { ScheduleList } from './ScheduleList'
import { schema } from './schema'
import { Wrapper, Container, FieldsWrapper, ActionsWrapper } from './styles'
import { IMoveDialogHandles, IMoveDialogProps, ISearchParams } from './types'

const MoveDialogComponent: React.ForwardRefRenderFunction<
  IMoveDialogHandles,
  IMoveDialogProps
> = ({ schedule, invoice }, ref) => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)

  const [api] = useAxios()
  const [formRef, validateForm] = useFormValidatorRef(schema)

  const [isLoading, setIsLoading] = useState(false)
  const [schedules, setSchedules] = useState<ISchedule[]>([])
  const [selection, setSelection] = useState<ISchedule>()

  const { movingScheduleInvoice } = useTypedSelector(state => state.schedules)

  const handleOpen = useCallback(() => setOpened(true), [])
  const handleClose = useCallback(() => {
    setOpened(false)
    setSchedules([])
    setSelection(undefined)
  }, [])

  const handleMove = useCallback(() => {
    if (!schedule || !invoice || !selection) return

    dispatch(moveScheduleInvoiceRequest(schedule, invoice, selection))
  }, [dispatch, schedule, selection, invoice])

  const handleSearch = useCallback(
    async (params: ISearchParams) => {
      const { success } = await validateForm()

      if (!success) return

      setIsLoading(true)

      try {
        const response = await api.get<ISchedule[]>('/schedules/search', {
          params: { date: params.scheduledAt, query: params.shippingName }
        })

        setSchedules(response.data)
      } catch (error) {
        const message = extractErrorMessage(error)

        remote.dialog.showErrorBox('Erro na busca', String(message))
      } finally {
        setIsLoading(false)
      }
    },
    [api, validateForm]
  )

  useImperativeHandle<{}, IMoveDialogHandles>(
    ref,
    () => ({ open: handleOpen }),
    [handleOpen]
  )

  return (
    <Modal isOpen={opened} onRequestClose={handleClose} style={modalStyles}>
      <Wrapper>
        <Container>
          <FieldsWrapper onSubmit={handleSearch} ref={formRef}>
            <DateInput
              name="scheduledAt"
              label="Data do Agendamento"
              inputProps={{ autoFocus: true }}
            />

            <TextInput name="shippingName" label="Transportadora" />

            <SubmitButton
              label="Pesquisar"
              icon={<MdSearch size={24} />}
              loading={isLoading}
            />
          </FieldsWrapper>

          <ScheduleList
            schedules={schedules}
            selection={selection}
            onSelectionChange={setSelection}
          />
        </Container>

        <ActionsWrapper>
          <Button label="Fechar" onClick={handleClose} secondary />

          <Button
            label="Mover Nota"
            onClick={handleMove}
            disabled={!selection}
            loading={movingScheduleInvoice}
          />
        </ActionsWrapper>
      </Wrapper>
    </Modal>
  )
}

export const MoveDialog = forwardRef(MoveDialogComponent)
export * from './types'
