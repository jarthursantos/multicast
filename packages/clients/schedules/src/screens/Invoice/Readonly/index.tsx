import React, { useCallback, useRef, useState } from 'react'

import { FormHandles } from '@unform/core'
import { remote } from 'electron'

import { extractErrorMessage, useAxios } from '@shared/axios'
import {
  Button,
  ProviderInput,
  DateInput,
  NumberInput,
  FileInput,
  SelectInput
} from '@shared/web-components'

import { KeyField } from '~/components/KeyField'
import { IFile, InvoiceDivergence } from '~/store/modules/schedules/types'
import { openReceiptWindow } from '~/windows/receipt/actions'

import { InvoiceAttachments } from '../Attachments'
import {
  Wrapper,
  FormWrapper,
  Container,
  Inline,
  InlineCTE,
  ActionsWrapper
} from './styles'
import { IReadonlyInvoiceScreenProps } from './types'

const ReadonlyInvoiceScreen: React.VFC<IReadonlyInvoiceScreenProps> = ({
  schedule,
  invoice
}) => {
  const formRef = useRef<FormHandles>(null)

  const [api] = useAxios()
  const [isGeneratingReceipt, setGeneratingReceipt] = useState<boolean>(false)

  const handleGenerateReceipt = useCallback(async () => {
    try {
      setGeneratingReceipt(true)

      const { data } = await api.get<IFile>(
        `/schedules/${schedule.id}/invoices/${invoice.id}/receipt`
      )

      openReceiptWindow(data.filename, data.url)
    } catch (error) {
      const message = extractErrorMessage(error)

      remote?.dialog.showErrorBox('Erro ao gerar recibo', String(message))
    } finally {
      setGeneratingReceipt(false)
    }
  }, [api, schedule, invoice])

  return (
    <Wrapper>
      <FormWrapper onSubmit={console.log} initialData={invoice} ref={formRef}>
        <Container>
          <ProviderInput name="provider" label="Fornecedor" single disabled />

          <Inline>
            <NumberInput
              name="number"
              label="Número"
              inputProps={{ disabled: true }}
            />

            <DateInput
              name="emittedAt"
              label="Emissão"
              inputProps={{ disabled: true }}
            />

            <SelectInput
              name="importation"
              label="Importação"
              inputProps={{
                isDisabled: true,
                options: [
                  { label: 'SIM', value: true },
                  { label: 'NÃO', value: false }
                ]
              }}
            />
          </Inline>

          <KeyField
            name="key"
            label="Chave da Nota"
            inputProps={{ disabled: true }}
          />

          <Inline>
            <NumberInput
              name="weight"
              label="Peso"
              inputProps={{ disabled: true }}
            />

            <NumberInput
              name="volume"
              label="Volume"
              inputProps={{ disabled: true }}
            />

            <NumberInput
              name="value"
              label="Valor"
              inputProps={{ disabled: true }}
            />
          </Inline>

          <InlineCTE>
            <NumberInput
              name="cteNumber"
              label="Número do CTE"
              inputProps={{ disabled: true }}
            />

            <KeyField
              name="cteKey"
              label="Chave do CTE"
              inputProps={{ disabled: true }}
            />
          </InlineCTE>

          <Inline>
            <FileInput
              name="invoiceFile"
              label="Arquivo da Nota"
              accept="application/pdf, application/octet"
            />

            <FileInput
              name="cteFile"
              label="Arquivo do CTE"
              accept="application/pdf, application/octet"
            />
          </Inline>
        </Container>

        <ActionsWrapper>
          <Button
            secondary
            label="Gerar Recibo"
            onClick={handleGenerateReceipt}
            loading={isGeneratingReceipt}
            disabled={
              Boolean(invoice?.canceledAt) ||
              Boolean(invoice?.divergence === InvoiceDivergence.NOT_RECEIVED) ||
              Boolean(invoice?.divergence === InvoiceDivergence.RESCHEDULED)
            }
          />
        </ActionsWrapper>
      </FormWrapper>

      <InvoiceAttachments invoice={invoice} />
    </Wrapper>
  )
}

export { ReadonlyInvoiceScreen }
