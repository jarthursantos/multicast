import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { IEmailOptions } from 'create-outlook-mail'
import { useFormValidator } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import { extractErrorMessage, useAxios } from '@shared/axios'
import { createMailModal } from '@shared/outlook-mail'
import { Button } from '@shared/web-components'
import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'
import {
  Form,
  ActionsContainer,
  FormHandles
} from '@shared/web-components/Form'

import AccompanimentData from '~/components/Forms/AccompanimentData'
import { OptionData } from '~/components/Forms/AccompanimentData/types'
import Observations from '~/components/Forms/Observations'
import RequestData from '~/components/Forms/RequestData'
import { useTypedSelector } from '~/store'
import {
  markAccompanimentAsReleasedRequest,
  markAccompanimentAsReviewedRequest,
  renewAccompanimentRequest,
  updateAccompanimentRequest
} from '~/store/modules/accompaniments/actions'
import {
  Types,
  Accompaniment,
  UntrackedInvoice,
  MarkAccompanimentAsSendedSuccessAction,
  MarkAccompanimentAsReleasedSuccessAction,
  MarkAccompanimentAsReviewedSuccessAction,
  AddAnnotationSuccessAction
} from '~/store/modules/accompaniments/types'
import { closeWindow } from '~/utils/close-window'

import { ConfirmMailSendedDialog } from './ConfirmMailSended'
import { schema } from './schema'
import { Wrapper, Container } from './styles'
import { AccompanimentDetailsScreenProps } from './types'

const AccompanimentDetailsScreen: React.VFC<AccompanimentDetailsScreenProps> = ({
  accompaniment: remoteAccompaniment
}) => {
  const dispatch = useDispatch()

  const formRef = useRef<FormHandles>(null)
  const validateForm = useFormValidator(formRef, schema)

  const [api, haveToken] = useAxios()

  const [sendingMail, setSendingMail] = useState(false)
  const [isConfirmMailOpen, setConfirmMailOpen] = useState(false)
  const [accompaniment, setAccompaniment] = useState<Accompaniment>(
    remoteAccompaniment
  )
  const [invoices, setInvoices] = useState<OptionData[]>([])

  const {
    updatingAccompaniment,
    renewingAccompaniment,
    markingAsReviewed,
    markingAsReleased
  } = useTypedSelector(state => state.accompaniments)

  const sended = useMemo(() => !!accompaniment?.sendedAt, [accompaniment])
  const reviewed = useMemo(() => !!accompaniment?.reviewedAt, [accompaniment])
  const released = useMemo(() => !!accompaniment?.releasedAt, [accompaniment])

  const openConfirmMail = useCallback(() => setConfirmMailOpen(true), [])
  const closeConfirmMail = useCallback(() => setConfirmMailOpen(false), [])

  const handleSendMail = useCallback(async () => {
    try {
      setSendingMail(true)

      const url = `accompaniments/${accompaniment.id}/generatePDF`

      const { data } = await api.get<
        IEmailOptions & { file?: { url: string } }
      >(url)

      createMailModal(
        { ...data, attachments: [data.file?.url], bodyType: 'html' },
        () => {
          setSendingMail(false)

          if (!accompaniment.sendedAt) {
            openConfirmMail()
          }
        }
      )
    } catch (error) {
      const message = extractErrorMessage(error)

      toast.error(message)

      setSendingMail(false)
    }
  }, [accompaniment, openConfirmMail])

  const handleMarkAsReviewed = useCallback(() => {
    dispatch(markAccompanimentAsReviewedRequest(accompaniment.id))
  }, [dispatch, accompaniment])

  const handleMarkAsReleased = useCallback(() => {
    dispatch(markAccompanimentAsReleasedRequest(accompaniment.id))
  }, [dispatch, accompaniment])

  const handleRenew = useCallback(() => {
    dispatch(renewAccompanimentRequest(accompaniment.id))
  }, [accompaniment, dispatch])

  const handleSubmit = useCallback(
    async (data: any) => {
      const { success } = await validateForm()

      if (success) {
        formRef.current?.setErrors({})

        dispatch(updateAccompanimentRequest(accompaniment.id, data))
      }
    },
    [dispatch, accompaniment, validateForm, formRef]
  )

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm()
  }, [formRef])

  useEffect(() => {
    async function loadInvoices() {
      try {
        const { data } = await api.get<UntrackedInvoice[]>(
          `accompaniments/${accompaniment.id}/untrackedInvoices`
        )

        if (data) {
          setInvoices(
            data.map(({ number, amountValue, transactionNumber }) => ({
              label: `${number} - ${formatPrice(amountValue)}`,
              value: transactionNumber
            }))
          )
        } else {
          setInvoices([])
        }
      } catch (error) {
        setInvoices([])
      }
    }

    if (accompaniment && haveToken) {
      loadInvoices()
    }
  }, [accompaniment, api, haveToken])

  useEffect(() => {
    remoteAccompaniment && setAccompaniment(remoteAccompaniment)
  }, [remoteAccompaniment])

  useWatchAction<MarkAccompanimentAsSendedSuccessAction>(
    ({ payload }) => setAccompaniment(payload.accompaniment),
    Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS
  )

  useWatchAction<MarkAccompanimentAsReleasedSuccessAction>(
    ({ payload }) => setAccompaniment(payload.accompaniment),
    Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS
  )

  useWatchAction<MarkAccompanimentAsReviewedSuccessAction>(
    ({ payload }) => setAccompaniment(payload.accompaniment),
    Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS
  )

  useWatchAction<AddAnnotationSuccessAction>(
    ({ payload }) => {
      setAccompaniment(oldValue => ({
        ...oldValue,
        annotations: [...oldValue.annotations, payload.annotation]
      }))
    },
    [Types.ADD_ANNOTATION_SUCCESS]
  )

  useWatchAction(closeWindow, [
    Types.UPDATE_ACCOMPANIMENT_SUCCESS,
    Types.RENEW_ACCOMPANIMENT_SUCCESS,
    Types.CANCEL_ACCOMPANIMENT_SUCCESS
  ])

  return (
    <>
      <Wrapper>
        <Container>
          <Form
            onSubmit={handleSubmit}
            initialData={accompaniment}
            ref={formRef}
          >
            <RequestData
              amountValue={accompaniment?.purchaseOrder.amountValue || 0}
              deliveredValue={accompaniment?.purchaseOrder.deliveredValue || 0}
            />

            <AccompanimentData
              options={invoices}
              disabled={!sended || !reviewed || !released}
              isFreeOnBoard={accompaniment?.purchaseOrder.freight === 'FOB'}
            />
          </Form>

          <Observations
            accompanimentId={accompaniment?.id}
            observations={accompaniment?.annotations || []}
          />
        </Container>

        <ActionsContainer>
          {accompaniment?.sendedAt && (
            <Button
              secondary
              label="Anexar em E-Mail"
              onClick={handleSendMail}
              loading={sendingMail}
            />
          )}

          {/* <Button secondary label="Gerar PDF" onClick={handleGeneratePDF} /> */}

          {!sended && (
            <Button
              label="Enviar Pedido"
              onClick={handleSendMail}
              loading={sendingMail}
            />
          )}

          {!reviewed && sended && (
            <Button
              label="Confirmar Revisão do Pedido"
              onClick={handleMarkAsReviewed}
              loading={markingAsReviewed}
            />
          )}

          {!released && reviewed && sended && (
            <Button
              label="Confirmar Liberação p/ Faturar"
              onClick={handleMarkAsReleased}
              loading={markingAsReleased}
            />
          )}

          {released && reviewed && sended && (
            <>
              {accompaniment.transactionNumber && !accompaniment.renewedAt && (
                <Button
                  secondary
                  label="Renovar Saldo"
                  loading={renewingAccompaniment}
                  onClick={handleRenew}
                />
              )}

              <Button
                label="Salvar"
                loading={updatingAccompaniment}
                onClick={handleSubmitForm}
              />
            </>
          )}
        </ActionsContainer>
      </Wrapper>

      <ConfirmMailSendedDialog
        accompaniment={accompaniment}
        isOpen={isConfirmMailOpen}
        onClose={closeConfirmMail}
      />
    </>
  )
}

export { AccompanimentDetailsScreen }

// const handleGeneratePDF = useCallback(async () => {
//   try {
//     const { data } = await api.get(
//       `accompaniments/${accompaniment.id}/generatePDF`
//     )

//     console.log({ data })
//   } catch (error) {
//     const message = extractErrorMessage(error)

//     toast.error(message)
//   }
// }, [api, accompaniment])
