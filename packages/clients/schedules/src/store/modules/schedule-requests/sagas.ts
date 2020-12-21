import { AxiosResponse } from 'axios'
import { takeLatest, all, call, put } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import {
  addScheduleRequestFailure,
  addScheduleRequestSuccess,
  updateScheduleRequestFailure,
  updateScheduleRequestSuccess,
  removeScheduleRequestFailure,
  removeScheduleRequestSuccess,
  loadScheduleRequestSuccess,
  loadScheduleRequestFailure
} from './actions'
import {
  IAddScheduleRequestRequestAction,
  IRemoveScheduleRequestRequestAction,
  IUpdateScheduleRequestRequestAction,
  IScheduleRequest,
  Types
} from './types'

function* addScheduleRequest({ payload }: IAddScheduleRequestRequestAction) {
  const { scheduleRequest } = payload

  try {
    const { data }: AxiosResponse<IScheduleRequest> = yield call(
      api.post,
      '/scheduleRequests',
      scheduleRequest
    )

    yield put(addScheduleRequestSuccess(data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(addScheduleRequestFailure(message))
  }
}

function* updateScheduleRequest({
  payload
}: IUpdateScheduleRequestRequestAction) {
  const { scheduleRequest, data: updateData } = payload

  try {
    const { data }: AxiosResponse<IScheduleRequest> = yield call(
      api.put,
      `/scheduleRequests/${scheduleRequest.id}`,
      updateData
    )

    yield put(updateScheduleRequestSuccess(scheduleRequest, data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(updateScheduleRequestFailure(message))
  }
}

function* removeScheduleRequest({
  payload
}: IRemoveScheduleRequestRequestAction) {
  const { scheduleRequest } = payload

  try {
    yield call(api.delete, `/scheduleRequests/${scheduleRequest.id}`)

    yield put(removeScheduleRequestSuccess(scheduleRequest))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(removeScheduleRequestFailure(message))
  }
}

function* loadScheduleRequests() {
  try {
    const { data }: AxiosResponse<IScheduleRequest[]> = yield call(
      api.get,
      '/scheduleRequests'
    )

    yield put(loadScheduleRequestSuccess(data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(loadScheduleRequestFailure(message))
  }
}

export default all([
  takeLatest(Types.ADD_SCHEDULE_REQUESTS_REQUEST, addScheduleRequest),
  takeLatest(Types.UPDATE_SCHEDULE_REQUESTS_REQUEST, updateScheduleRequest),
  takeLatest(Types.REMOVE_SCHEDULE_REQUESTS_REQUEST, removeScheduleRequest),
  takeLatest(Types.LOAD_SCHEDULE_REQUESTS_REQUEST, loadScheduleRequests)
])
