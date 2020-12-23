import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdAutorenew, MdSave } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'
import { pick } from 'lodash'

import { useWatchAction } from '@shared/action-watcher'
import {
  DateInput,
  CheckboxInput,
  TextInput,
  SelectInput,
  Button
} from '@shared/web-components'

import {
  contabilFormatter,
  dateColumnOptions,
  doubleFormatter,
  Table
} from '~/components/Table'
import { useTypedSelector } from '~/store'
import { rescheduleScheduleRequest } from '~/store/modules/schedules/actions'
import {
  IInvoice,
  InvoiceDivergence,
  InvoiceSituations,
  IRescheduleScheduleData,
  ISchedule,
  Types
} from '~/store/modules/schedules/types'
import { closeWindow } from '~/utils/close-window'
import { openInvoiceReadonlyModeWindow } from '~/windows/invoice/readonly/actions'

import { schema } from './schema'
import {
  Layout,
  FormWrapper,
  Container,
  Inline,
  InvoicesWrapper,
  RescheduleWrapper
} from './styles'
import { INonReceivedScheduleScreenProps } from './types'

const NonReceivedScheduleScreen: React.VFC<INonReceivedScheduleScreenProps> = ({
  schedule
}) => {
  const dispatch = useDispatch()
  const scheduleRef = useRef<ISchedule>(null)
  const [formRef, validateForm] = useFormValidatorRef(schema)

  const [rescheduleMode, setRescheduleMode] = useState(false)

  const { reschedulingSchedule } = useTypedSelector(state => state.schedules)

  const handleReschedule = useCallback(async () => {
    if (!rescheduleMode) {
      setRescheduleMode(true)
      return
    }

    const { success } = await validateForm()

    if (!success || !schedule) return

    const data = formRef.current.getData() as IRescheduleScheduleData

    dispatch(rescheduleScheduleRequest(schedule, pick(data, 'scheduledAt')))
  }, [schedule, rescheduleMode, formRef, validateForm])

  useEffect(() => {
    scheduleRef.current = schedule
  }, [schedule])

  useWatchAction(closeWindow, [Types.RESCHEDULE_SCHEDULES_SUCCESS])

  return (
    <Layout>
      <FormWrapper onSubmit={console.log} initialData={schedule} ref={formRef}>
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
            inputProps={{ disabled: true }}
          />

          <Inline>
            <SelectInput
              name="freightType"
              label="Tipo do Frete"
              inputProps={{
                isDisabled: true,
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
                isDisabled: true,
                menuPosition: 'fixed',
                options: [
                  { label: 'Externo', value: 'EXTERNAL' },
                  { label: 'Interno', value: 'INTERNAL' }
                ]
              }}
            />
          </Inline>
        </Container>
      </FormWrapper>

      <InvoicesWrapper>
        <Table
          options={{
            height: '100%',
            data: schedule?.invoices || [],
            rowDblClick: (_, row) => {
              const invoice: IInvoice = row.getData()

              openInvoiceReadonlyModeWindow(scheduleRef.current, invoice)
            },
            rowFormatter: row => {
              const { situation, divergence }: IInvoice = row.getData()

              if (
                situation === InvoiceSituations.CANCELED ||
                divergence === InvoiceDivergence.NOT_RECEIVED ||
                divergence === InvoiceDivergence.RESCHEDULED
              ) {
                row.getElement().style.cssText = 'text-decoration: line-through'
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
      </InvoicesWrapper>
    </Layout>
  )
}

export { NonReceivedScheduleScreen }
