import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import Head from 'next/head'
import styled from 'styled-components'

import { useWatchAction } from '@shared/action-watcher'
import { useAxios, useSetToken } from '@shared/axios'
import { Button } from '@shared/web-components'
import {
  Form,
  ActionsContainer,
  SubmitButton
} from '@shared/web-components/Form'

import AccompanimentData from '~/components/Forms/AccompanimentData'
import Observations from '~/components/Forms/Observations'
import RequestData from '~/components/Forms/RequestData'
import { useCloseWindow } from '~/hooks/use-close-window'
import { useWindowParams } from '~/hooks/use-window-params'
import { useTypedSelector } from '~/store'
import {
  markAccompanimentAsSendRequestAction,
  markAccompanimentAsReviewedRequestAction,
  markAccompanimentAsReleasedRequestAction,
  updateAccompanimentRequestAction
} from '~/store/modules/accompaniments/actions'
import { Types } from '~/store/modules/accompaniments/types'
import { Accompaniment } from '~/store/modules/accompaniments/types'

interface SuccessActionResult {
  type: string
  payload: {
    accompaniment: Accompaniment
  }
}

const Next = () => {
  const dispatch = useDispatch()
  const setToken = useSetToken()
  const params = useWindowParams<{ id: string; token: string }>()

  const [api, haveToken] = useAxios()
  const [accompaniment, setAccompaniment] = useState<Accompaniment>()

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
    (data: any) =>
      dispatch(updateAccompanimentRequestAction(accompaniment.id, data)),
    [dispatch, accompaniment]
  )

  useEffect(() => {
    async function findAccompaniment() {
      try {
        const { data } = await api.get<Accompaniment>(
          `accompaniments/${params.id}`
        )

        setAccompaniment(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (haveToken) {
      findAccompaniment()
    } else if (params) {
      setToken(params.token)
    }
  }, [setToken, params, api, haveToken])

  useWatchAction<SuccessActionResult>(
    [
      Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
      Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS,
      Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS
    ],
    ({ payload }) => {
      setAccompaniment(payload.accompaniment)
    }
  )

  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Acompanhamento</title>
      </Head>

      {accompaniment && (
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
      )}
    </React.Fragment>
  )
}

const Container = styled.div`
  display: flex;

  & > * {
    width: 345px;
  }

  padding: 8px;

  & > div {
    padding: 8px;
  }
`

export default Next
