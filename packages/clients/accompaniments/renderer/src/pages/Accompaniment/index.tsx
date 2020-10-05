import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import { Button } from '@shared/web-components'
import {
  Form,
  SubmitButton,
  ActionsContainer
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
  updateAccompanimentRequestAction
} from '~/store/modules/accompaniments/actions'
import { Types, Accompaniment } from '~/store/modules/accompaniments/types'
import { closeWindow } from '~/util/close-window'

import { Container } from './styles'
import { SuccessActionResult } from './types'

const AccompanimentPage: React.FC = () => {
  const dispatch = useDispatch()
  const params = useWindowParams<{ id: string; token: string }>()

  const [accompaniment, setAccompaniment] = useState<Accompaniment>()
  const remoteAccompaniment = useAccompaniment(params?.id, params?.token)

  const { updatingAccompaniment } = useTypedSelector(
    state => state.accompaniments
  )

  const {
    markingAsSended,
    markingAsReviewed,
    markingAsReleased
  } = useTypedSelector(state => state.accompaniments)

  const handleMarkAsSended = useCallback(() => {
    dispatch(markAccompanimentAsSendRequestAction(accompaniment.id))
  }, [dispatch, accompaniment])
  const handleMarkAsReviewed = useCallback(() => {
    dispatch(markAccompanimentAsReviewedRequestAction(accompaniment.id))
  }, [dispatch, accompaniment])
  const handleMarkAsReleased = useCallback(() => {
    dispatch(markAccompanimentAsReleasedRequestAction(accompaniment.id))
  }, [dispatch, accompaniment])

  const sended = useMemo(() => !!accompaniment?.sendedAt, [accompaniment])
  const reviewed = useMemo(() => !!accompaniment?.reviewedAt, [accompaniment])
  const released = useMemo(() => !!accompaniment?.releasedAt, [accompaniment])

  const handleSubmit = useCallback(
    (data: any) => {
      console.log({ data })

      dispatch(updateAccompanimentRequestAction(accompaniment.id, data))
    },
    [dispatch, accompaniment]
  )

  useEffect(() => {
    if (remoteAccompaniment) {
      setAccompaniment(remoteAccompaniment)
    }
  }, [remoteAccompaniment])

  useWatchAction<SuccessActionResult>(
    ({ payload }) => {
      setAccompaniment(payload.accompaniment)
    },
    [
      Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
      Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS,
      Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS
    ]
  )

  useWatchAction(closeWindow, Types.UPDATE_ACCOMPANIMENT_SUCCESS)

  return (
    <Form onSubmit={handleSubmit} initialData={accompaniment}>
      <Container>
        <RequestData />

        <AccompanimentData disabled={!sended || !reviewed || !released} />

        <Observations />
      </Container>

      <ActionsContainer>
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
          <SubmitButton label="Salvar" loading={updatingAccompaniment} />
        )}
      </ActionsContainer>
    </Form>
  )
}

export default AccompanimentPage
