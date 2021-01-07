import { toast } from 'react-toastify'

import { remote } from 'electron'
import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import { RootState } from '~/store/state'

import {
  addAnnotationFailure,
  addAnnotationSuccess,
  cancelAccompanimentFailure,
  cancelAccompanimentSuccess,
  loadAccompanimentsFailure,
  loadAccompanimentsSuccess,
  markAccompanimentAsReleasedFailure,
  markAccompanimentAsReleasedSuccess,
  markAccompanimentAsReviewedFailure,
  markAccompanimentAsReviewedSuccess,
  markAccompanimentAsSendedFailure,
  markAccompanimentAsSendedSuccess,
  renewAccompanimentFailure,
  renewAccompanimentSuccess,
  updateAccompanimentFailure,
  updateAccompanimentSuccess
} from './actions'
import {
  Accompaniment,
  AddAnnotationRequestAction,
  Annotation,
  CancelAccompanimentRequestAction,
  MarkAccompanimentAsReleasedRequestAction,
  MarkAccompanimentAsReviewedRequestAction,
  MarkAccompanimentAsSendedRequestAction,
  RenewAccompanimentRequestAction,
  Types,
  UpdateAccompanimentRequestAction
} from './types'

export function* loadAccompaniments() {
  try {
    const token: string = yield select((state: RootState) => state.auth.token)

    const response = yield call(api.get, '/accompaniments', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const accompaniments: Accompaniment[] = response.data

    toast.success('Acompanhamentos atualizados')

    yield put(loadAccompanimentsSuccess(accompaniments))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox(
      'Erro ao carregar acompanhamentos',
      String(message)
    )

    yield put(loadAccompanimentsFailure(message))
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

    yield put(updateAccompanimentSuccess(accompaniment))
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(updateAccompanimentFailure(message))
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

    yield put(renewAccompanimentSuccess(accompaniment, renewedAccompaniment))
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(renewAccompanimentFailure(message))
  }
}

export function* cancelAccompaniment({
  payload
}: CancelAccompanimentRequestAction) {
  try {
    const { id, motive } = payload

    yield call(api.put, `/accompaniments/${id}/cancel`, { motive })

    toast.success('Acompanhamento Cancelado')

    yield put(cancelAccompanimentSuccess(id))
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(cancelAccompanimentFailure(message))
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

    yield put(addAnnotationSuccess(id, annotation))
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(addAnnotationFailure(message))
  }
}

export function* markAccompanimentAsSended({
  payload
}: MarkAccompanimentAsSendedRequestAction) {
  try {
    const { id } = payload

    const response = yield call(api.post, `/accompaniments/${id}/markAsSended`)

    const accompaniment: Accompaniment = response.data

    yield put(markAccompanimentAsSendedSuccess(accompaniment))

    toast.success('Acompanhamento Atualizado')
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(markAccompanimentAsSendedFailure(message))
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

    yield put(markAccompanimentAsReviewedSuccess(accompaniment))

    toast.success('Acompanhamento Atualizado')
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(markAccompanimentAsReviewedFailure(message))
  }
}

export function* markAccompanimentAsReleased({
  payload
}: MarkAccompanimentAsReleasedRequestAction) {
  try {
    const { id } = payload

    const response = yield call(
      api.post,
      `/accompaniments/${id}/markAsReleased`
    )

    const accompaniment: Accompaniment = response.data

    yield put(markAccompanimentAsReleasedSuccess(accompaniment))

    toast.success('Acompanhamento Atualizado')
  } catch (err) {
    const message = extractErrorMessage(err)

    toast.error(message)

    yield put(markAccompanimentAsReleasedFailure(message))
  }
}

export default all([
  takeLatest(Types.LOAD_ACCOMPANIMENTS_REQUEST, loadAccompaniments),

  takeLatest(Types.UPDATE_ACCOMPANIMENT_REQUEST, updateAccompaniment),

  takeLatest(Types.RENEW_ACCOMPANIMENT_REQUEST, renewAccompaniment),

  takeLatest(Types.CANCEL_ACCOMPANIMENT_REQUEST, cancelAccompaniment),

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
