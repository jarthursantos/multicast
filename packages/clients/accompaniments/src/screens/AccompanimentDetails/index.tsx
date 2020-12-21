import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { IEmailOptions } from 'create-outlook-mail'
import { useFormValidator } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import { extractErrorMessage, useAxios, useSetToken } from '@shared/axios'
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
  markAccompanimentAsReleasedRequestAction,
  markAccompanimentAsReviewedRequestAction,
  renewAccompanimentRequestAction,
  updateAccompanimentRequestAction
} from '~/store/modules/accompaniments/actions'
import {
  Types,
  Accompaniment,
  UntrackedInvoice
} from '~/store/modules/accompaniments/types'
import { closeWindow } from '~/utils/close-window'
import { useAccompanimentDetails } from '~/windows/AccompanimentDetails/actions'

import { ConfirmMailSendedDialog } from './ConfirmMailSended'
import { schema } from './schema'
import { Wrapper, Container } from './styles'
import {
  AccompanimentSuccessActionResult,
  AnnotationSuccessActionResult
} from './types'

const AccompanimentDetailsScreen: React.VFC = () => {
  const dispatch = useDispatch()

  const formRef = useRef<FormHandles>(null)
  const validateForm = useFormValidator(formRef, schema)

  const [api, haveToken] = useAxios()
  const setToken = useSetToken()

  const [sendingMail, setSendingMail] = useState(false)
  const [isConfirmMailOpen, setConfirmMailOpen] = useState(false)
  const [remoteAccompaniment, token] = useAccompanimentDetails()
  const [accompaniment, setAccompaniment] = useState<Accompaniment>()
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
    dispatch(markAccompanimentAsReviewedRequestAction(accompaniment.id))
  }, [dispatch, accompaniment])

  const handleMarkAsReleased = useCallback(() => {
    dispatch(markAccompanimentAsReleasedRequestAction(accompaniment.id))
  }, [dispatch, accompaniment])

  const handleRenew = useCallback(() => {
    dispatch(renewAccompanimentRequestAction(accompaniment.id))
  }, [accompaniment, dispatch])

  const handleSubmit = useCallback(
    async (data: any) => {
      const { success } = await validateForm()

      if (success) {
        formRef.current?.setErrors({})

        dispatch(updateAccompanimentRequestAction(accompaniment.id, data))
      }
    },
    [dispatch, accompaniment, validateForm, formRef]
  )

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm()
  }, [formRef])

  useEffect(() => {
    if (remoteAccompaniment) {
      setAccompaniment(remoteAccompaniment)
    }
  }, [remoteAccompaniment])

  useEffect(() => setToken(token), [setToken, token])

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
        console.log(error)
      }
    }

    if (haveToken) {
      loadInvoices()
    }
  }, [accompaniment, haveToken])

  useWatchAction<AccompanimentSuccessActionResult>(
    ({ payload }) => {
      setAccompaniment(payload.accompaniment)
    },
    [
      Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
      Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS,
      Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS
    ]
  )

  useWatchAction<AnnotationSuccessActionResult>(
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
