import React, { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidatorRef } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import { useAxios } from '@shared/axios'
import {
  Button,
  SubmitButton,
  ProviderInput,
  DateInput,
  NumberInput,
  FileInput,
  IProvider,
  SelectInput
} from '@shared/web-components'

import { KeyField } from '~/components/KeyField'
import { useTypedSelector } from '~/store'
import { editScheduleInvoiceRequest } from '~/store/modules/schedules/actions'
import {
  IFileResult,
  IUpdateInvoiceData,
  Types
} from '~/store/modules/schedules/types'
import { closeWindow } from '~/utils/close-window'

import { InvoiceAttachments } from '../Attachments'
import { CancelDialog, ICancelDialogHandles } from './CancelDialog'
import { DeleteDialog, IDeleteDialogHandles } from './DeleteDialog'
import { MoveDialog, IMoveDialogHandles } from './MoveDialog'
import { updateSchema } from './schema'
import {
  Wrapper,
  FormWrapper,
  Container,
  Inline,
  InlineCTE,
  ActionsWrapper,
  FillSpace
} from './styles'
import { IEditInvoiceScreenProps } from './types'

interface IRawScheduleInvoice
  extends Omit<IUpdateInvoiceData, 'provider' | 'id'> {
  providers: IProvider[]
}

const EditInvoiceScreen: React.VFC<IEditInvoiceScreenProps> = ({
  schedule,
  invoice
}) => {
  const dispatch = useDispatch()
  const deleteDialogRef = useRef<IDeleteDialogHandles>(null)
  const cancelDialogRef = useRef<ICancelDialogHandles>(null)
  const moveDialogRef = useRef<IMoveDialogHandles>(null)

  const [formRef, validateForm] = useFormValidatorRef(updateSchema)
  const { updatingScheduleInvoice } = useTypedSelector(state => state.schedules)

  const [api] = useAxios()

  const handleSubmit = useCallback(
    async (data: IRawScheduleInvoice) => {
      const { success } = await validateForm()

      if (!success || data.providers.length === 0) return

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
        editScheduleInvoiceRequest(schedule, invoice, {
          ...data,
          cteFileId,
          invoiceFileId,
          providerCode: data.providers[0].code
        })
      )
    },
    [invoice, schedule, dispatch, validateForm, api]
  )

  const handleDelete = useCallback(() => deleteDialogRef.current?.open(), [
    deleteDialogRef
  ])

  const handleCancel = useCallback(() => cancelDialogRef.current?.open(), [
    cancelDialogRef
  ])

  const handleMove = useCallback(() => moveDialogRef.current?.open(), [
    moveDialogRef
  ])

  useWatchAction(closeWindow, [
    Types.UPDATE_SCHEDULE_INVOICES_SUCCESS,
    Types.DELETE_SCHEDULE_INVOICES_SUCCESS,
    Types.CANCEL_SCHEDULE_INVOICES_SUCCESS,
    Types.MOVE_SCHEDULE_INVOICES_SUCCESS
  ])

  return (
    <React.Fragment>
      <Wrapper>
        <FormWrapper
          onSubmit={handleSubmit}
          initialData={{
            ...invoice,
            providers: invoice ? [invoice.provider] : undefined
          }}
          ref={formRef}
        >
          <Container>
            <ProviderInput name="providers" label="Fornecedor" single />

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
            {schedule?.closedAt ? (
              <Button label="Remover Nota" onClick={handleCancel} secondary />
            ) : (
              <Button label="Apagar Nota" onClick={handleDelete} secondary />
            )}

            <Button label="Mover Nota" onClick={handleMove} secondary />

            <FillSpace />

            <SubmitButton label="Atualizar" loading={updatingScheduleInvoice} />
          </ActionsWrapper>
        </FormWrapper>

        <InvoiceAttachments invoice={invoice} />
      </Wrapper>

      <DeleteDialog
        schedule={schedule}
        invoice={invoice}
        ref={deleteDialogRef}
      />

      <CancelDialog
        schedule={schedule}
        invoice={invoice}
        ref={cancelDialogRef}
      />

      <MoveDialog schedule={schedule} invoice={invoice} ref={moveDialogRef} />
    </React.Fragment>
  )
}

export { EditInvoiceScreen }
