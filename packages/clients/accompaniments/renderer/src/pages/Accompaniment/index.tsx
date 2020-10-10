import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidator } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import { Button } from '@shared/web-components'
import {
  Form,
  ActionsContainer,
  FormHandles
} from '@shared/web-components/Form'

import AccompanimentData from '~/components/Forms/AccompanimentData'
import Observations from '~/components/Forms/Observations'
import RequestData from '~/components/Forms/RequestData'
import { useAccompaniment } from '~/hooks/use-accompaniments'
import { useWindowParams } from '~/hooks/use-window-params'
import { useTypedSelector } from '~/store'
import {
  markAccompanimentAsReleasedRequestAction,
  markAccompanimentAsReviewedRequestAction,
  markAccompanimentAsSendRequestAction,
  renewAccompanimentRequestAction,
  updateAccompanimentRequestAction
} from '~/store/modules/accompaniments/actions'
import { Types, Accompaniment } from '~/store/modules/accompaniments/types'
import { closeWindow } from '~/util/close-window'

import { schema } from './schema'
import { Wrapper, Container } from './styles'
import {
  AccompanimentSuccessActionResult,
  AnnotationSuccessActionResult
} from './types'

const AccompanimentPage: React.FC = () => {
  const dispatch = useDispatch()
  const params = useWindowParams<{ id: string; token: string }>()

  const formRef = useRef<FormHandles>(null)
  const validateForm = useFormValidator(formRef, schema)

  const [accompaniment, setAccompaniment] = useState<Accompaniment>()
  const [remoteAccompaniment, invoices] = useAccompaniment(
    params?.id,
    params?.token
  )

  const { updatingAccompaniment, renewingAccompaniment } = useTypedSelector(
    state => state.accompaniments
  )

  const {
    markingAsSended,
    markingAsReviewed,
    markingAsReleased
  } = useTypedSelector(state => state.accompaniments)

  const sended = useMemo(() => !!accompaniment?.sendedAt, [accompaniment])
  const reviewed = useMemo(() => !!accompaniment?.reviewedAt, [accompaniment])
  const released = useMemo(() => !!accompaniment?.releasedAt, [accompaniment])

  const handleMarkAsSended = useCallback(() => {
    dispatch(markAccompanimentAsSendRequestAction(accompaniment.id))
  }, [dispatch, accompaniment])
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

  useWatchAction(closeWindow, Types.UPDATE_ACCOMPANIMENT_SUCCESS)

  return (
    <Wrapper>
      <Container>
        <Form onSubmit={handleSubmit} initialData={accompaniment} ref={formRef}>
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
          accompanimentId={params?.id}
          observations={accompaniment?.annotations || []}
        />
      </Container>

      <ActionsContainer>
        {accompaniment && (
          <>
            <Button secondary label="Anexar ao E-Mail" />

            <Button secondary label="Exportar" />

            <Button secondary label="Imprimir" />

            <Button secondary label="Cancelar" />

            {!sended && (
              <Button
                label="Confirmar Envio do Pedido"
                onClick={handleMarkAsSended}
                loading={markingAsSended}
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
                {accompaniment.transactionNumber &&
                  !accompaniment.renewedAt && (
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
          </>
        )}
      </ActionsContainer>
    </Wrapper>
  )
}

export default AccompanimentPage
