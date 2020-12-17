import React, { useCallback, useEffect, useState } from 'react'

import { remote } from 'electron'
import { useFormValidatorRef } from 'hookable-unform'
import { ObjectSchema } from 'yup'

import {
  SubmitButton,
  TextInput,
  SelectInput,
  NumberInput,
  Checkbox
} from '@shared/web-components'
import { formatPriceWithoutSymbol } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { Charge, Size } from '~/store/modules/schedules/types'
import { calculateInvoiceDischarge } from '~/utils/calculate-invoice-discharge'

import { Receipts } from './Receipts'
import { perScheduleSchema, perInvoiceSchema } from './schema'
import {
  Wrapper,
  Container,
  ReceiptsWrapper,
  ActionsWrapper,
  Inline
} from './styles'
import { IReceiveScheduleScreenProps } from './types'

const ReceiveScheduleScreen: React.VFC<IReceiveScheduleScreenProps> = ({
  schedule
}) => {
  const [schema, setSchema] = useState<ObjectSchema>(perScheduleSchema)
  const [formRef, validateForm] = useFormValidatorRef(schema)

  const [chargeType, setChargeType] = useState<Charge>('BEAT')
  const [pipeSize, setPipeSize] = useState<Size>('SMALL')
  const [assistant, setAssistent] = useState<boolean>(true)
  const [palletized, setPalletized] = useState<boolean>(true)
  const [receiptPerInvoice, setReceiptPerInvoice] = useState(false)

  const handleSubmit = useCallback(
    async (data: any) => {
      const { success } = await validateForm()

      if (!success) return

      remote.dialog.showErrorBox('', JSON.stringify(data, null, 4))
    },
    [validateForm]
  )

  useEffect(() => {
    if (!schedule) return

    let dischargeValue = 0.0

    const { invoices, dischargeTable } = schedule

    invoices.forEach((invoice, index) => {
      if (chargeType === 'PIPE') {
        formRef.current?.setFieldValue(
          `invoices[${index}].dischargeValue`,
          '-,--'
        )
      } else {
        const invoiceDischarge = calculateInvoiceDischarge({
          invoice,
          dischargeTable,
          chargeType,
          pipeSize,
          assistant,
          palletized
        })

        formRef.current?.setFieldValue(
          `invoices[${index}].dischargeValue`,
          formatPriceWithoutSymbol(invoiceDischarge)
        )

        dischargeValue += invoiceDischarge
      }
    })

    if (chargeType === 'PIPE') {
      switch (pipeSize) {
        case 'SMALL':
          dischargeValue = dischargeTable.smallPipe
          break
        case 'MEDIUM':
          dischargeValue = dischargeTable.mediumPipe
          break
        case 'LARGE':
          dischargeValue = dischargeTable.largePipe
          break
      }
    }

    formRef.current?.setFieldValue(
      'dischargeValue',
      formatPriceWithoutSymbol(dischargeValue)
    )
  }, [formRef, schedule, chargeType, pipeSize, assistant, palletized])

  useEffect(() => {
    setSchema(receiptPerInvoice ? perInvoiceSchema : perScheduleSchema)
  }, [receiptPerInvoice])

  return (
    <Wrapper
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={{
        ...schedule,
        vehicleSize: 'SMALL',
        chargeType: 'BEAT',
        paymentType: 'MONEY',
        assistent: true,
        palletized: true,
        pipeSize: 'SMALL'
      }}
    >
      <Container>
        <Inline>
          <TextInput name="driver" label="Motorista" />
          <TextInput name="lecturer" label="Conferente" />
        </Inline>

        <Inline>
          <SelectInput
            name="vehicleSize"
            label="Tamanho do Veículo"
            inputProps={{
              options: [
                { label: 'Pequeno', value: 'SMALL' },
                { label: 'Médio', value: 'MEDIUM' },
                { label: 'Grande', value: 'LARGER' }
              ]
            }}
          />
          <SelectInput
            name="paymentType"
            label="Forma de Pagamento"
            inputProps={{
              options: [
                { label: 'Dinheiro', value: 'MONEY' },
                { label: 'Depósito', value: 'DEPOSIT' },
                { label: 'Pendente', value: 'PENDING' }
              ]
            }}
          />
        </Inline>

        <SelectInput
          name="chargeType"
          label="Tipo da Carga"
          onSelectionChange={setChargeType}
          inputProps={{
            options: [
              { label: 'Batida', value: 'BEAT' },
              { label: 'Volumosa', value: 'VOLUME' },
              { label: 'Tubo', value: 'PIPE' }
            ]
          }}
        />

        {chargeType === 'PIPE' ? (
          <SelectInput
            name="pipeSize"
            label="Tamanho do Tubo"
            onSelectionChange={setPipeSize}
            inputProps={{
              options: [
                { label: 'Pequeno', value: 'SMALL' },
                { label: 'Médio', value: 'MEDIUM' },
                { label: 'Grande', value: 'LARGER' }
              ]
            }}
          />
        ) : (
          <Inline>
            <SelectInput
              name="palletized"
              label="Paletizada"
              onSelectionChange={setPalletized}
              inputProps={{
                options: [
                  { label: 'Sim', value: true },
                  { label: 'Não', value: false }
                ]
              }}
            />
            <SelectInput
              name="assistent"
              label="Assistente"
              onSelectionChange={setAssistent}
              inputProps={{
                options: [
                  { label: 'Sim', value: true },
                  { label: 'Não', value: false }
                ]
              }}
            />
          </Inline>
        )}

        <Inline>
          <TextInput
            name="dischargeValue"
            label="Valor da Descarga"
            inputProps={{ disabled: true, style: { textAlign: 'right' } }}
          />

          {receiptPerInvoice || (
            <NumberInput name="receiptValue" label="Valor do Recibo" />
          )}
        </Inline>
      </Container>

      <ReceiptsWrapper>
        <Receipts schedule={schedule} receiptPerInvoice={receiptPerInvoice} />
      </ReceiptsWrapper>

      <ActionsWrapper>
        <Checkbox
          label="Recibo por nota"
          value={receiptPerInvoice}
          onValueChange={setReceiptPerInvoice}
        />

        <SubmitButton label="Confirmar Recibos" />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { ReceiveScheduleScreen }
