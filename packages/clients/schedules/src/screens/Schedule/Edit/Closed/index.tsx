import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdAutorenew, MdSave } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { useFormValidator, useFormValidatorRef } from 'hookable-unform'
import { pick } from 'lodash'

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
  rescheduleScheduleRequest,
  updateScheduleRequest
} from '~/store/modules/schedules/actions'
import {
  IAddScheduleInvoiceSuccessAction,
  ICancelScheduleInvoiceSuccessAction,
  IInvoice,
  IMoveScheduleInvoiceSuccessAction,
  InvoiceDivergence,
  InvoiceSituations,
  IRescheduleScheduleData,
  ISchedule,
  IUpdateScheduleData,
  IUpdateScheduleInvoiceSuccessAction,
  Types
} from '~/store/modules/schedules/types'
import { closeWindow } from '~/utils/close-window'
import { openCreateInvoiceWindow } from '~/windows/invoice/create/actions'
import { openInvoiceEditModeWindow } from '~/windows/invoice/edit/actions'
import { openInvoiceReadonlyModeWindow } from '~/windows/invoice/readonly/actions'
import { openReceiveScheduleWindow } from '~/windows/schedule/receive/actions'

import {
  MotivePickerDialog,
  IMotivePickerDialogHandles
} from './MotivePickerDialog'
import { rescheduleSchema, updateSchema } from './schema'
import {
  Layout,
  FormWrapper,
  Container,
  FillSpace,
  ActionsWrapper,
  InvoicesWrapper,
  Inline,
  RescheduleWrapper
} from './styles'
import {
  IEditClosedScheduleScreenProps,
  IChangeDivergenceActions
} from './types'

const EditClosedScheduleScreen: React.VFC<IEditClosedScheduleScreenProps> = ({
  schedule
}) => {
  const dispatch = useDispatch()
  const scheduleRef = useRef<ISchedule>(null)
  const motiveDialogRef = useRef<IMotivePickerDialogHandles>(null)

  const [formRef, validateUpdateForm] = useFormValidatorRef(updateSchema)
  const validateScheduleForm = useFormValidator(formRef, rescheduleSchema)

  const [rescheduleMode, setRescheduleMode] = useState(false)

  const { reschedulingSchedule, updatingSchedule } = useTypedSelector(
    state => state.schedules
  )

  const [invoices, setInvoices] = useState<IInvoice[]>([])

  const handleOpenReceive = useCallback(
    () => openReceiveScheduleWindow(schedule),
    [schedule]
  )

  const handleSubmit = useCallback(
    async (data: IUpdateScheduleData) => {
      const { success } = await validateUpdateForm()

      if (!success || !schedule) return

      dispatch(updateScheduleRequest(schedule, data))
    },
    [schedule, dispatch, validateUpdateForm]
  )

  const handleReschedule = useCallback(async () => {
    if (!rescheduleMode) {
      setRescheduleMode(true)
      return
    }

    const { success } = await validateScheduleForm()

    if (!success || !schedule) return

    const data = formRef.current.getData() as IRescheduleScheduleData

    dispatch(rescheduleScheduleRequest(schedule, pick(data, 'scheduledAt')))
  }, [schedule, rescheduleMode, formRef, validateScheduleForm])

  const handleCancel = useCallback(() => {
    motiveDialogRef.current?.open()
  }, [motiveDialogRef])

  useEffect(() => schedule && setInvoices(schedule.invoices || []), [schedule])

  useEffect(() => {
    scheduleRef.current = schedule
  }, [schedule])

  useWatchAction(closeWindow, [
    Types.UPDATE_SCHEDULES_SUCCESS,
    Types.CLOSE_SCHEDULES_SUCCESS,
    Types.CANCEL_SCHEDULES_SUCCESS,
    Types.RECEIVE_SCHEDULES_SUCCESS
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

  useWatchAction<ICancelScheduleInvoiceSuccessAction>(
    ({ payload }) => {
      if (payload.schedule.id === schedule.id) {
        const { canceledInvoice } = payload

        setInvoices(current => [
          ...current.filter(invoice => invoice.id !== canceledInvoice.id),
          canceledInvoice
        ])
      }
    },
    [Types.CANCEL_SCHEDULE_INVOICES_SUCCESS],
    [schedule]
  )

  useWatchAction<IMoveScheduleInvoiceSuccessAction>(
    ({ payload }) => {
      if (payload.originSchedule.id === schedule.id) {
        setInvoices(payload.originSchedule.invoices)
      }

      if (payload.destinationSchedule.id === schedule.id) {
        setInvoices(payload.destinationSchedule.invoices)
      }
    },
    [Types.DELETE_SCHEDULE_INVOICES_SUCCESS],
    [schedule]
  )

  useWatchAction<IChangeDivergenceActions>(
    ({ payload }) => {
      const { invoice } = payload

      setInvoices(currentInvoices =>
        currentInvoices.map(currentInvoice =>
          currentInvoice.id === invoice.id ? invoice : currentInvoice
        )
      )
    },
    [
      Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_SUCCESS,
      Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_SUCCESS
    ],
    [invoices]
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
            <h2>Reagendar</h2>

            <RescheduleWrapper>
              <DateInput
                name="scheduledAt"
                label="Data do Agendamento"
                inputProps={{ disabled: !rescheduleMode }}
              />

              <Button
                label="Reagendar"
                secondary={!rescheduleMode}
                loading={reschedulingSchedule}
                icon={
                  rescheduleMode ? (
                    <MdSave size={24} />
                  ) : (
                    <MdAutorenew size={24} />
                  )
                }
                onClick={handleReschedule}
              />
            </RescheduleWrapper>

            <hr />

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
              label="Cancelar Agendamento"
              onClick={handleCancel}
              secondary
            />

            <FillSpace />

            <SubmitButton label="Atualizar " loading={updatingSchedule} />
          </ActionsWrapper>
        </FormWrapper>

        <InvoicesWrapper>
          <Table
            options={{
              height: '100%',
              data: invoices,
              rowDblClick: (_, row) => {
                const invoice: IInvoice = row.getData()

                if (
                  scheduleRef.current.receivedAt ||
                  (invoice.divergence &&
                    invoice.divergence !== InvoiceDivergence.ADDED)
                ) {
                  openInvoiceReadonlyModeWindow(scheduleRef.current, invoice)
                } else {
                  openInvoiceEditModeWindow(scheduleRef.current, invoice)
                }
              },
              rowFormatter: row => {
                const { situation, divergence }: IInvoice = row.getData()

                if (
                  situation === InvoiceSituations.CANCELED ||
                  divergence === InvoiceDivergence.NOT_RECEIVED ||
                  divergence === InvoiceDivergence.RESCHEDULED
                ) {
                  row.getElement().style.cssText =
                    'text-decoration: line-through'
                }
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
            <Button label="Receber" onClick={handleOpenReceive} />
          </ActionsWrapper>
        </InvoicesWrapper>
      </Layout>

      <MotivePickerDialog schedule={schedule} ref={motiveDialogRef} />
    </React.Fragment>
  )
}

export { EditClosedScheduleScreen }
