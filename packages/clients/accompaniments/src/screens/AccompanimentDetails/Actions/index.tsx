import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { IEmailOptions } from 'create-outlook-mail'

import { extractErrorMessage, useAxios } from '@shared/axios'
import { createMailModal } from '@shared/outlook-mail'
import { Button } from '@shared/web-components'

import { useTypedSelector } from '~/store'
import {
  markAccompanimentAsReleasedRequest,
  markAccompanimentAsReviewedRequest,
  markAccompanimentAsFinishedRequest,
  renewAccompanimentRequest
} from '~/store/modules/accompaniments/actions'

import { ActionsProps } from './types'

const Actions: React.VFC<ActionsProps> = ({
  accompaniment,
  sended,
  reviewed,
  released,
  scheduled,
  unlocked,
  finished,
  openConfirmMail,
  openCancel,
  openAccompanimentReview,
  submitForm
}) => {
  const {
    updatingAccompaniment,
    renewingAccompaniment,
    markingAsReviewed,
    markingAsReleased,
    markingAsFinished
  } = useTypedSelector(state => state.accompaniments)

  const dispatch = useDispatch()

  const [api] = useAxios()

  const [sendingMail, setSendingMail] = useState(false)

  const handleSendMail = useCallback(async () => {
    try {
      setSendingMail(true)

      const url = `accompaniments/${accompaniment.id}/generatePDF`

      const { data } = await api.get<
        IEmailOptions & { file?: { url: string } }
      >(url)

      createMailModal(
        { ...data, attachments: [data.file?.url], bodyType: 'html' },
        `${accompaniment.purchaseOrder.number}`,
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

  const handleMarkAsFinished = useCallback(() => {
    dispatch(markAccompanimentAsFinishedRequest(accompaniment.id))
  }, [dispatch, accompaniment])

  const handleRenew = useCallback(() => {
    dispatch(renewAccompanimentRequest(accompaniment.id))
  }, [accompaniment, dispatch])

  return (
    <React.Fragment>
      {accompaniment?.sendedAt && (
        <Button
          secondary
          label="Anexar em E-Mail"
          onClick={handleSendMail}
          loading={sendingMail}
        />
      )}

      {/* <Button secondary label="Gerar PDF" onClick={handleGeneratePDF} /> */}

      <Button secondary label="Cancelar Saldo" onClick={openCancel} />

      <Button secondary label="Revisar" onClick={openAccompanimentReview} />

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
            onClick={submitForm}
          />
        </>
      )}

      {scheduled && unlocked && !finished && (
        <Button
          label="Confirmar Recebimento da Nota Original"
          onClick={handleMarkAsFinished}
          loading={markingAsFinished}
        />
      )}
    </React.Fragment>
  )
}

export { Actions }
