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
  markAccompanimentAsFinishedSuccess,
  markAccompanimentAsFinishedFailure,
  renewAccompanimentFailure,
  renewAccompanimentSuccess,
  updateAccompanimentFailure,
  updateAccompanimentSuccess,
  loadCanceledAccompanimentsSuccess,
  loadCanceledAccompanimentsFailure,
  loadCompletedAccompanimentsSuccess,
  loadCompletedAccompanimentsFailure
} from './actions'
import {
  Accompaniment,
  AddAnnotationRequestAction,
  Annotation,
  CancelAccompanimentRequestAction,
  MarkAccompanimentAsFinishedRequestAction,
  MarkAccompanimentAsReleasedRequestAction,
  MarkAccompanimentAsReviewedRequestAction,
  MarkAccompanimentAsSendedRequestAction,
  LoadCanceledAccompanimentsRequestAction,
  RenewAccompanimentRequestAction,
  Types,
  UpdateAccompanimentRequestAction,
  LoadCompletedAccompanimentsRequestAction
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

export function* loadCanceledAccompaniments({
  payload
}: LoadCanceledAccompanimentsRequestAction) {
  try {
    const token: string = yield select((state: RootState) => state.auth.token)
    const { filters } = payload

    const response = yield call(api.get, '/accompaniments/all/canceleds', {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const accompaniments: Accompaniment[] = response.data

    toast.success('Acompanhamentos cancelados atualizados')

    yield put(loadCanceledAccompanimentsSuccess(accompaniments))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox(
      'Erro ao carregar acompanhamentos cancelados',
      String(message)
    )

    yield put(loadCanceledAccompanimentsFailure(message))
  }
}

export function* loadCompletedAccompaniments({
  payload
}: LoadCompletedAccompanimentsRequestAction) {
  try {
    const token: string = yield select((state: RootState) => state.auth.token)
    const { filters } = payload

    const response = yield call(api.get, '/accompaniments/all/finisheds', {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const accompaniments: Accompaniment[] = response.data

    toast.success('Acompanhamentos finalizados atualizados')

    yield put(loadCompletedAccompanimentsSuccess(accompaniments))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox(
      'Erro ao carregar acompanhamentos finalizados',
      String(message)
    )

    yield put(loadCompletedAccompanimentsFailure(message))
  }
}

export function* updateAccompaniment({
  payload
}: UpdateAccompanimentRequestAction) {
  try {
    const { id, data } = payload

    const response = yield call(api.put, `/accompaniments/${id}`, data)

    const accompaniment: Accompaniment = response.data

    console.log({ accompaniment, data })

    toast.success('Acompanhamento atualizado')

    yield put(updateAccompanimentSuccess(accompaniment))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox(
      'Erro ao atualizar acompanhamento',
      String(message)
    )

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

    remote?.dialog.showErrorBox(
      'Erro ao renovar acompanhamento',
      String(message)
    )

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

    remote?.dialog.showErrorBox(
      'Erro ao cancelar acompanhamento',
      String(message)
    )

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

    remote?.dialog.showErrorBox('Erro ao adicionar anotação', String(message))

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

    remote?.dialog.showErrorBox(
      'Erro ao atualizar acompanhamento',
      String(message)
    )
    yield put(markAccompanimentAsSendedFailure(message))
  }
}

export function* markAccompanimentAsFinished({
  payload
}: MarkAccompanimentAsFinishedRequestAction) {
  try {
    const { id } = payload

    const response = yield call(
      api.post,
      `/accompaniments/${id}/markAsFinished`
    )

    const accompaniment: Accompaniment = response.data

    yield put(markAccompanimentAsFinishedSuccess(accompaniment))

    toast.success('Acompanhamento Atualizado')
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox(
      'Erro ao atualizar acompanhamento',
      String(message)
    )
    yield put(markAccompanimentAsFinishedFailure(message))
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

    remote?.dialog.showErrorBox(
      'Erro ao atualizar acompanhamento',
      String(message)
    )

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

    remote?.dialog.showErrorBox(
      'Erro ao atualizar acompanhamento',
      String(message)
    )

    yield put(markAccompanimentAsReleasedFailure(message))
  }
}

export default all([
  takeLatest(Types.LOAD_ACCOMPANIMENTS_REQUEST, loadAccompaniments),

  takeLatest(
    Types.LOAD_CANCELED_ACCOMPANIMENTS_REQUEST,
    loadCanceledAccompaniments
  ),

  takeLatest(
    Types.LOAD_COMPLETED_ACCOMPANIMENTS_REQUEST,
    loadCompletedAccompaniments
  ),

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
  ),
  takeLatest(
    Types.MARK_ACCOMPANIMENT_FINISHED_REQUEST,
    markAccompanimentAsFinished
  )
])
