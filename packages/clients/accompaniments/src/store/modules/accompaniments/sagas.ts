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

// annotations: []
// billingAt: "2021-01-10T03:00:00.000Z"
// createdAt: "2020-10-26T16:35:59.461Z"
// criticalLevel: "NORMAL"
// delay: null
// expectedBillingAt: "2021-01-09T03:00:00.000Z"
// id: "879d2cf0-acaf-476b-8d24-26286420b2ae"
// invoiceNumber: 2882
// invoiceProvider: 1075
// isOutstanding: false
// purchaseOrder: {number: 16216, emittedAt: "2020-09-23T03:00:00.000Z", provider: {…}, buyer: {…}}
// releasedAt: "2021-01-08T03:00:00.000Z"
// reviewedAt: "2021-01-07T18:21:19.918Z"
// sendedAt: "2020-10-27T19:42:10.333Z"
// transactionNumber: 555745
// updatedAt: "2021-01-08T11:02:44.058Z"

// TODO

// before

// annotations: []
// billingAt: "2021-01-06T03:00:00.000Z"
// createdAt: "2020-10-26T16:35:59.341Z"
// criticalLevel: "NORMAL"
// delay: 2
// expectedBillingAt: "2021-01-05T03:00:00.000Z"
// id: "9d548cf1-c8b1-4276-a081-0b5ac338ca85"
// isOutstanding: false
// purchaseOrder: {number: 16211, emittedAt: "2020-09-21T03:00:00.000Z", provider: {…}, buyer: {…}}
// releasedAt: "2021-01-04T03:00:00.000Z"
// reviewedAt: "2021-01-08T13:08:21.504Z"
// sendedAt: "2021-01-08T13:08:05.845Z"
// updatedAt: "2021-01-08T13:09:47.161Z"

// freeOnBoardAt: undefined

// schedulingAt: undefined

// "sendedAt": "2021-01-08T13:08:05.845Z",
// "reviewedAt": "2021-01-08T13:08:21.504Z",
// "releasedAt": "2021-01-04T03:00:00.000Z",
// "expectedBillingAt": "2021-01-05T03:00:00.000Z",
// "billingAt": "2021-01-06T03:00:00.000Z",
// "transactionNumber": 559939,
// "invoiceNumber": 16393,
// "invoiceProvider": 1379,
// "annotations": [],
// "isOutstanding": false,
// "delay": 2,
// "criticalLevel": "DANGER",
// "id": "9d548cf1-c8b1-4276-a081-0b5ac338ca85",
// "createdAt": "2020-10-26T16:35:59.341Z",
// "updatedAt": "2021-01-08T13:24:13.491Z"
