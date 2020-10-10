import { toast } from 'react-toastify'

import { all, takeLatest, call, put } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import {
  addAnnotationFailureAction,
  addAnnotationSuccessAction,
  loadAccompanimentsFailureAction,
  loadAccompanimentsSuccessAction,
  markAccompanimentAsReleasedFailureAction,
  markAccompanimentAsReleasedSuccessAction,
  markAccompanimentAsReviewedFailureAction,
  markAccompanimentAsReviewedSuccessAction,
  markAccompanimentAsSendFailureAction,
  markAccompanimentAsSendSuccessAction,
  renewAccompanimentFailureAction,
  renewAccompanimentSuccessAction,
  updateAccompanimentFailureAction,
  updateAccompanimentSuccessAction
} from './actions'
import {
  Accompaniment,
  AddAnnotationRequestAction,
  Annotation,
  MarkAccompanimentAsReleadedRequestAction,
  MarkAccompanimentAsReviewedRequestAction,
  MarkAccompanimentAsSendRequestAction,
  RenewAccompanimentRequestAction,
  Types,
  UpdateAccompanimentRequestAction
} from './types'

export function* loadAccompaniments() {
  try {
    const response = yield call(api.get, '/accompaniments')

    const accompaniments: Accompaniment[] = response.data

    toast.success('Acompanhamentos atualizados')

    yield put(loadAccompanimentsSuccessAction(accompaniments))
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(loadAccompanimentsFailureAction(message))
  }
}

export function* updateAccompaniment({
  payload
}: UpdateAccompanimentRequestAction) {
  try {
    const { id, data } = payload

    const response = yield call(api.put, `/accompaniments/${id}`, data)

    const accompaniment: Accompaniment = response.data

    toast.success('Acompanhamento atualizado')

    yield put(updateAccompanimentSuccessAction(accompaniment))
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(updateAccompanimentFailureAction(message))
  }
}

export function* renewAccompaniment({
  payload
}: RenewAccompanimentRequestAction) {
  try {
    const { id } = payload

    const response = yield call(api.post, `/accompaniments/${id}/renew`)

    const {
      accompaniment,
      renewedAccompaniment
    }: {
      accompaniment: Accompaniment
      renewedAccompaniment: Accompaniment
    } = response.data

    toast.success('Acompanhamento Renovado')

    yield put(
      renewAccompanimentSuccessAction(accompaniment, renewedAccompaniment)
    )
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(renewAccompanimentFailureAction(message))
  }
}

export function* addAnnotation({ payload }: AddAnnotationRequestAction) {
  try {
    const { id, data } = payload

    const response = yield call(
      api.post,
      `/accompaniments/${id}/annotations`,
      data
    )

    const annotation: Annotation = response.data

    toast.success('Observação adicionada')

    yield put(addAnnotationSuccessAction(id, annotation))
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(addAnnotationFailureAction(message))
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

  takeLatest(Types.UPDATE_ACCOMPANIMENT_REQUEST, updateAccompaniment),

  takeLatest(Types.RENEW_ACCOMPANIMENT_REQUEST, renewAccompaniment),

  takeLatest(Types.ADD_ANNOTATION_REQUEST, addAnnotation),

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
