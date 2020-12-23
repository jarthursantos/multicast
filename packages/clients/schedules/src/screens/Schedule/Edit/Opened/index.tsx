import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'
import { cloneDeep } from 'lodash'

import { useWatchAction } from '@shared/action-watcher'
import {
  CheckboxInput,
  DateInput,
  SelectInput,
  TextInput,
  SubmitButton,
  Button
} from '@shared/web-components'

import {
  contabilFormatter,
  dateColumnOptions,
  doubleFormatter,
  Table
} from '~/components/Table'
import { useTypedSelector } from '~/store'
import {
  updateScheduleRequest,
  closeScheduleRequest
} from '~/store/modules/schedules/actions'
import {
  IUpdateScheduleData,
  IAddScheduleInvoiceSuccessAction,
  IUpdateScheduleInvoiceSuccessAction,
  Types,
  IInvoice,
  ISchedule,
  IDeleteScheduleInvoiceSuccessAction,
  IMoveScheduleInvoiceSuccessAction
} from '~/store/modules/schedules/types'
import { closeWindow } from '~/utils/close-window'
import { openCreateInvoiceWindow } from '~/windows/invoice/create/actions'
import { openInvoiceEditModeWindow } from '~/windows/invoice/edit/actions'

import { DeleteDialog, IDeleteDialogHandles } from './DeleteDialog'
import { updateSchema } from './schema'
import {
  Layout,
  FormWrapper,
  Container,
  FillSpace,
  ActionsWrapper,
  InvoicesWrapper,
  Inline
} from './styles'
import { IEditOpenedScheduleScreenProps } from './types'

const EditOpenedScheduleScreen: React.VFC<IEditOpenedScheduleScreenProps> = ({
  schedule
}) => {
  const dispatch = useDispatch()
  const scheduleRef = useRef<ISchedule>(null)
  const deleteDialogRef = useRef<IDeleteDialogHandles>(null)

  const { updatingSchedule, closingSchedules } = useTypedSelector(
    state => state.schedules
  )

  const [formRef, validateForm] = useFormValidatorRef(updateSchema)

  const [invoices, setInvoices] = useState<IInvoice[]>([])

  const handleSubmit = useCallback(
    async (data: IUpdateScheduleData) => {
      const { success } = await validateForm()

      if (!success || !schedule) return

      dispatch(updateScheduleRequest(schedule, data))
    },
    [schedule, dispatch, validateForm]
  )

  const handleClose = useCallback(() => {
    dispatch(closeScheduleRequest(schedule))
  }, [schedule, dispatch])

  const handleDelete = useCallback(() => deleteDialogRef.current?.open(), [
    deleteDialogRef
  ])

  useEffect(() => {
    if (!schedule) return

    setInvoices(schedule.invoices || [])
  }, [schedule])

  useEffect(() => {
    scheduleRef.current = schedule
  }, [schedule])

  useWatchAction(closeWindow, [
    Types.UPDATE_SCHEDULES_SUCCESS,
    Types.CLOSE_SCHEDULES_SUCCESS,
    Types.DELETE_SCHEDULES_SUCCESS,
    Types.RESCHEDULE_SCHEDULES_SUCCESS
  ])

  useWatchAction<IAddScheduleInvoiceSuccessAction>(
    ({ payload }) => {
      if (payload.schedule.id === schedule.id) {
        setInvoices(current => [...current, payload.invoice])
      }
    },
    [Types.ADD_SCHEDULE_INVOICES_SUCCESS],
    [schedule]
  )

  useWatchAction<IUpdateScheduleInvoiceSuccessAction>(
    ({ payload }) => {
      if (payload.schedule.id === schedule.id) {
        setInvoices(current => [
          ...current.filter(invoice => invoice.id !== payload.invoice.id),
          payload.invoice
        ])
      }
    },
    [Types.UPDATE_SCHEDULE_INVOICES_SUCCESS],
    [schedule]
  )

  useWatchAction<IDeleteScheduleInvoiceSuccessAction>(
    ({ payload }) => {
      if (payload.schedule.id === schedule.id) {
        setInvoices(current =>
          current.filter(invoice => invoice.id !== payload.deletedInvoice.id)
        )
      }
    },
    [Types.DELETE_SCHEDULE_INVOICES_SUCCESS],
    [schedule]
  )

  useWatchAction<IMoveScheduleInvoiceSuccessAction>(
    ({ payload }) => {
      if (payload.originSchedule.id === schedule.id) {
        setInvoices(cloneDeep(payload.originSchedule.invoices))
      }

      if (payload.destinationSchedule.id === schedule.id) {
        setInvoices(cloneDeep(payload.destinationSchedule.invoices))
      }
    },
    [Types.MOVE_SCHEDULE_INVOICES_SUCCESS],
    [schedule]
  )

  return (
    <React.Fragment>
      <Layout>
        <FormWrapper
          onSubmit={handleSubmit}
          initialData={schedule}
          ref={formRef}
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
            <Button
              label="Apagar Agendamento"
              onClick={handleDelete}
              secondary
            />

            <FillSpace />

            <SubmitButton label="Atualizar" loading={updatingSchedule} />
          </ActionsWrapper>
        </FormWrapper>

        <InvoicesWrapper>
          <Table
            options={{
              height: '100%',
              data: invoices,
              rowDblClick: (_, row) => {
                const invoice: IInvoice = row.getData()

                openInvoiceEditModeWindow(scheduleRef.current, invoice)
              },
              columns: [
                {
                  title: 'NF',
                  width: 120,
                  field: 'number',
                  sorter: 'number',
                  hozAlign: 'right',
                  bottomCalc: 'count',
                  frozen: true
                },
                {
                  title: 'Fornecedor',
                  width: 350,
                  field: 'provider.name'
                },
                {
                  title: 'Fantasia',
                  width: 200,
                  field: 'provider.fantasy'
                },
                {
                  title: 'Emissão NF',
                  width: 150,
                  field: 'emittedAt',
                  ...dateColumnOptions
                },
                {
                  title: 'Valor NF',
                  width: 110,
                  field: 'value',
                  sorter: 'number',
                  formatter: contabilFormatter,
                  bottomCalc: 'sum',
                  bottomCalcFormatter: contabilFormatter
                },
                {
                  title: 'Peso',
                  width: 100,
                  field: 'weight',
                  hozAlign: 'right',
                  sorter: 'number',
                  formatter: doubleFormatter,
                  bottomCalc: 'sum',
                  bottomCalcFormatter: doubleFormatter
                },
                {
                  title: 'Volume',
                  width: 100,
                  field: 'volume',
                  hozAlign: 'right',
                  sorter: 'number',
                  bottomCalc: 'sum'
                },
                { title: 'Chave NF', width: 370, field: 'key' }
              ]
            }}
          />

          <ActionsWrapper>
            <Button
              label="Adicionar Nota Fiscal"
              onClick={() => openCreateInvoiceWindow(schedule)}
            />
            <Button
              label="Fechar Agendamento"
              onClick={handleClose}
              loading={closingSchedules}
            />
          </ActionsWrapper>
        </InvoicesWrapper>
      </Layout>

      <DeleteDialog ref={deleteDialogRef} schedule={schedule} />
    </React.Fragment>
  )
}

export { EditOpenedScheduleScreen }
