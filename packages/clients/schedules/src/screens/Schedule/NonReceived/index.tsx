import React, { useEffect, useRef } from 'react'

import {
  DateInput,
  CheckboxInput,
  TextInput,
  SelectInput
} from '@shared/web-components'

import {
  contabilFormatter,
  dateColumnOptions,
  doubleFormatter,
  Table
} from '~/components/Table'
import {
  IInvoice,
  InvoiceDivergence,
  InvoiceSituations,
  ISchedule
} from '~/store/modules/schedules/types'
import { openInvoiceReadonlyModeWindow } from '~/windows/invoice/readonly/actions'

import {
  Layout,
  FormWrapper,
  Container,
  Inline,
  InvoicesWrapper
} from './styles'
import { INonReceivedScheduleScreenProps } from './types'

const NonReceivedScheduleScreen: React.VFC<INonReceivedScheduleScreenProps> = ({
  schedule
}) => {
  const scheduleRef = useRef<ISchedule>(null)

  useEffect(() => {
    scheduleRef.current = schedule
  }, [schedule])

  return (
    <Layout>
      <FormWrapper onSubmit={console.log} initialData={schedule}>
        <Container>
          <h2>Reagendar</h2>

          <DateInput
            name="scheduledAt"
            label="Data do Agendamento"
            inputProps={{ disabled: true }}
          />

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
