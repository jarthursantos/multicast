import React, { useCallback, useEffect, useRef, useState } from 'react'

import { remote } from 'electron'

import { extractErrorMessage, useAxios } from '@shared/axios'
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
import {
  IFile,
  IInvoice,
  InvoiceDivergence,
  InvoiceSituations,
  ISchedule
} from '~/store/modules/schedules/types'
import { openInvoiceReadonlyModeWindow } from '~/windows/invoice/readonly/actions'
import { openReceiptWindow } from '~/windows/receipt/actions'

import {
  Layout,
  FormWrapper,
  Container,
  Inline,
  InvoicesWrapper,
  ActionsWrapper
} from './styles'
import { IReadonlyScheduleScreenProps } from './types'

const ReadonlyScheduleScreen: React.VFC<IReadonlyScheduleScreenProps> = ({
  schedule
}) => {
  const scheduleRef = useRef<ISchedule>(null)

  const [api] = useAxios()
  const [isGeneratingReceipt, setGeneratingReceipt] = useState<boolean>(false)

  const handleGenerateReceipt = useCallback(async () => {
    try {
      setGeneratingReceipt(true)

      const { data } = await api.get<IFile>(`/schedules/${schedule.id}/receipt`)

      openReceiptWindow(data.filename, data.url)
    } catch (error) {
      const message = extractErrorMessage(error)

      remote?.dialog.showErrorBox('Erro ao gerar recibo', String(message))
    } finally {
      setGeneratingReceipt(false)
    }
  }, [api, schedule])

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

          {schedule?.motive && (
            <TextInput
              name="motive"
              label="Motivo"
              inputProps={{ disabled: true }}
            />
          )}
        </Container>

        <ActionsWrapper>
          <Button
            label="Gerar Recibo"
            onClick={handleGenerateReceipt}
            loading={isGeneratingReceipt}
            secondary
          />
        </ActionsWrapper>
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

export { ReadonlyScheduleScreen }
