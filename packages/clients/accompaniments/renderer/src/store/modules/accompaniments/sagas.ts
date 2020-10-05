import { toast } from 'react-toastify'

import { all, takeLatest, call, put } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import {
  loadAccompanimentsFailureAction,
  loadAccompanimentsSuccessAction,
  markAccompanimentAsReleasedFailureAction,
  markAccompanimentAsReleasedSuccessAction,
  markAccompanimentAsReviewedFailureAction,
  markAccompanimentAsReviewedSuccessAction,
  markAccompanimentAsSendFailureAction,
  markAccompanimentAsSendSuccessAction
} from './actions'
import {
  Accompaniment,
  MarkAccompanimentAsReleadedRequestAction,
  MarkAccompanimentAsReviewedRequestAction,
  MarkAccompanimentAsSendRequestAction,
  Types
} from './types'

export function* loadAccompaniments() {
  try {
    const response = yield call(api.get, '/accompaniments')

    const accompaniments: Accompaniment[] = response.data

    yield put(loadAccompanimentsSuccessAction(accompaniments))
  } catch (err) {
    const message = extractErrorMessage(err)

    yield put(loadAccompanimentsFailureAction(message))
  }
}

export function* markAccompanimentAsSended({
  payload
}: MarkAccompanimentAsSendRequestAction) {
  try {
    const { id } = payload

    const response = yield call(api.post, `/accompaniments/${id}/markAsSended`)

    const accompaniment: Accompaniment = response.data

    yield put(markAccompanimentAsSendSuccessAction(accompaniment))

    toast.success('Acompanhamento Atualizado')
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(markAccompanimentAsSendFailureAction(message))
  }
}

export function* markAccompanimentAsReviewed({
  payload
}: MarkAccompanimentAsReviewedRequestAction) {
  try {
    const { id } = payload

    const response = yield call(
      api.post,
      `/accompaniments/${id}/markAsReviewed`
    )

    const accompaniment: Accompaniment = response.data

    yield put(markAccompanimentAsReviewedSuccessAction(accompaniment))

    toast.success('Acompanhamento Atualizado')
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(markAccompanimentAsReviewedFailureAction(message))
  }
}

export function* markAccompanimentAsReleased({
  payload
}: MarkAccompanimentAsReleadedRequestAction) {
  try {
    const { id } = payload

    const response = yield call(
      api.post,
      `/accompaniments/${id}/markAsReleased`
    )

    const accompaniment: Accompaniment = response.data

    yield put(markAccompanimentAsReleasedSuccessAction(accompaniment))

    toast.success('Acompanhamento Atualizado')
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(markAccompanimentAsReleasedFailureAction(message))
  }
}

export default all([
  takeLatest(Types.LOAD_ACCOMPANIMENTS_REQUEST, loadAccompaniments),

  takeLatest(
    Types.MARK_ACCOMPANIMENT_SENDED_REQUEST,
    markAccompanimentAsSended
  ),
  takeLatest(
    Types.MARK_ACCOMPANIMENT_REVIEWED_REQUEST,
    markAccompanimentAsReviewed
  ),
  takeLatest(
    Types.MARK_ACCOMPANIMENT_RELEASED_REQUEST,
    markAccompanimentAsReleased
  )
])
