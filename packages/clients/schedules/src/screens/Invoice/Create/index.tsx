import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'
import { ObjectSchema } from 'yup'

import { useWatchAction } from '@shared/action-watcher'
import { useAxios } from '@shared/axios'
import {
  SubmitButton,
  SingleProviderInput,
  DateInput,
  SelectInput,
  NumberInput,
  FileInput,
  IProvider
} from '@shared/web-components'

import { KeyField } from '~/components/KeyField'
import { useTypedSelector } from '~/store'
import { addScheduleInvoiceRequest } from '~/store/modules/schedules/actions'
import {
  ICreateInvoiceData,
  IFileResult,
  Types
} from '~/store/modules/schedules/types'
import { closeWindow } from '~/utils/close-window'

import { storeSchema, storeConflictedSchema } from './schema'
import { Wrapper, Container, ActionsWrapper, Inline, InlineCTE } from './styles'
import { ICreateInvoiceScreenProps } from './types'

interface IRawScheduleInvoice
  extends Omit<ICreateInvoiceData, 'provider' | 'id'> {
  provider: IProvider
}

const CreateInvoiceScreen: React.VFC<ICreateInvoiceScreenProps> = ({
  schedule
}) => {
  const dispatch = useDispatch()
  const [schema, setSchema] = useState<ObjectSchema>(storeSchema)

  const [formRef, validateForm] = useFormValidatorRef(schema)
  const { additingScheduleInvoice } = useTypedSelector(state => state.schedules)

  const [api] = useAxios()

  const handleSubmit = useCallback(
    async (data: IRawScheduleInvoice) => {
      const { success } = await validateForm()

      if (!success) return

      let invoiceFileId: string
      let cteFileId: string

      if (data.invoiceFile) {
        const invoiceFileData = new FormData()
        invoiceFileData.append('file', data.invoiceFile)

        const uploadInvoiceResult = await api.post<IFileResult>(
          '/files',
          invoiceFileData
        )

        invoiceFileId = uploadInvoiceResult.data.id
      }

      if (data.cteFile) {
        const cteFileData = new FormData()
        cteFileData.append('file', data.cteFile)

        const uploadInvoiceResult = await api.post<IFileResult>(
          '/files',
          cteFileData
        )

        cteFileId = uploadInvoiceResult.data.id
      }

      dispatch(
        addScheduleInvoiceRequest(schedule, {
          ...data,
          cteFileId,
          invoiceFileId,
          providerCode: data.provider.code
        })
      )
    },
    [schedule, dispatch, validateForm, api]
  )

  useEffect(() => {
    if (schedule?.closedAt) {
      setSchema(storeConflictedSchema)
    }
  }, [schedule])

  useWatchAction(closeWindow, [Types.ADD_SCHEDULE_INVOICES_SUCCESS])

  return (
    <Wrapper
      onSubmit={handleSubmit}
      ref={formRef}
      initialData={{ importation: true }}
    >
      <Container>
        <SingleProviderInput name="provider" label="Fornecedor" />

        <Inline>
          <NumberInput name="number" label="Número" />

          <DateInput name="emittedAt" label="Emissão" />

          <SelectInput
            name="importation"
            label="Importação"
            inputProps={{
              options: [
                { label: 'SIM', value: true },
                { label: 'NÃO', value: false }
              ]
            }}
          />
        </Inline>

        <KeyField name="key" label="Chave da Nota" />

        <Inline>
          <NumberInput name="weight" label="Peso" double />

          <NumberInput name="volume" label="Volume" double />

          <NumberInput name="value" label="Valor" double />
        </Inline>

        <InlineCTE>
          <NumberInput name="cteNumber" label="Número do CTE" />

          <KeyField name="cteKey" label="Chave do CTE" />
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
        <SubmitButton label="Adicionar" loading={additingScheduleInvoice} />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { CreateInvoiceScreen }
