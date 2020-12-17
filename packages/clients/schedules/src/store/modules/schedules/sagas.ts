import { AxiosResponse } from 'axios'
import { all, put, call, takeLatest } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import {
  loadSchedulesFailure,
  loadSchedulesSuccess,
  addScheduleFailure,
  addScheduleSuccess,
  updateScheduleFailure,
  updateScheduleSuccess,
  rescheduleScheduleFailure,
  rescheduleScheduleSuccess,
  deleteScheduleFailure,
  deleteScheduleSuccess,
  addScheduleInvoiceFailure,
  addScheduleInvoiceSuccess,
  editScheduleInvoiceFailure,
  editScheduleInvoiceSuccess,
  closeScheduleFailure,
  closeScheduleSuccess,
  cancelScheduleFailure,
  cancelScheduleSuccess,
  deleteScheduleInvoiceFailure,
  deleteScheduleInvoiceSuccess,
  cancelScheduleInvoiceFailure,
  cancelScheduleInvoiceSuccess,
  moveScheduleInvoiceFailure,
  moveScheduleInvoiceSuccess,
  markScheduleInvoiceAsReceivedSuccess,
  markScheduleInvoiceAsReceivedFailure,
  markScheduleInvoiceAsNonReceivedSuccess,
  markScheduleInvoiceAsNonReceivedFailure
} from './actions'
import {
  ISchedule,
  IAddScheduleRequestAction,
  Types,
  IUpdateScheduleRequestAction,
  IRescheduleScheduleRequestAction,
  IRescheduleResponse,
  IAddScheduleInvoiceRequestAction,
  IInvoice,
  IUpdateScheduleInvoiceRequestAction,
  IDeleteScheduleRequestAction,
  ICloseScheduleRequestAction,
  ICancelScheduleRequestAction,
  IDeleteScheduleInvoiceRequestAction,
  ICancelScheduleInvoiceRequestAction,
  IMoveScheduleInvoiceRequestAction,
  IMoveInvoiceResult,
  IMarkScheduleInvoiceAsReceivedRequestAction,
  IMarkScheduleInvoiceAsNonReceivedRequestAction
} from './types'

function* addSchedule({ payload }: IAddScheduleRequestAction) {
  try {
    const { schedule } = payload

    const { data }: AxiosResponse<ISchedule> = yield call(
      api.post,
      'schedules',
      schedule
    )

    yield put(addScheduleSuccess(data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(addScheduleFailure(message))
  }
}

function* updateSchedule({ payload }: IUpdateScheduleRequestAction) {
  try {
    const { schedule, data } = payload

    const response: AxiosResponse<ISchedule> = yield call(
      api.put,
      `schedules/${schedule.id}`,
      data
    )

    yield put(updateScheduleSuccess(schedule, response.data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(updateScheduleFailure(message))
  }
}

function* rescheduleSchedule({ payload }: IRescheduleScheduleRequestAction) {
  try {
    const { schedule, data } = payload

    const response: AxiosResponse<IRescheduleResponse> = yield call(
      api.put,
      `schedules/${schedule.id}/reschedule`,
      data
    )

    yield put(
      rescheduleScheduleSuccess(
        response.data.schedule,
        response.data.reschedule
      )
    )
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(rescheduleScheduleFailure(message))
  }
}

function* deleteSchedule({ payload }: IDeleteScheduleRequestAction) {
  try {
    const { schedule } = payload

    yield call(api.delete, `schedules/${schedule.id}`)

    yield put(deleteScheduleSuccess(schedule))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(deleteScheduleFailure(message))
  }
}

function* cancelSchedule({ payload }: ICancelScheduleRequestAction) {
  try {
    const { schedule, data } = payload

    const response: AxiosResponse<ISchedule> = yield call(
      api.put,
      `schedules/${schedule.id}/cancel`,
      data
    )

    yield put(cancelScheduleSuccess(schedule, response.data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(cancelScheduleFailure(message))
  }
}

function* closeSchedule({ payload }: ICloseScheduleRequestAction) {
  try {
    const { schedule } = payload

    const response: AxiosResponse<ISchedule> = yield call(
      api.put,
      `schedules/${schedule.id}/close`
    )

    yield put(closeScheduleSuccess(schedule, response.data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(closeScheduleFailure(message))
  }
}

function* loadSchedules() {
  try {
    const { data }: AxiosResponse<ISchedule[]> = yield call(
      api.get,
      'schedules',
      { params: { year: 2020, month: 12 } }
    )

    yield put(loadSchedulesSuccess(data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(loadSchedulesFailure(message))
  }
}

function* addScheduleInvoice({ payload }: IAddScheduleInvoiceRequestAction) {
  try {
    const { schedule, data } = payload

    const response: AxiosResponse<IInvoice> = yield call(
      api.post,
      `schedules/${schedule.id}/invoices`,
      data
    )

    yield put(addScheduleInvoiceSuccess(schedule, response.data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(addScheduleInvoiceFailure(message))
  }
}

function* updateScheduleInvoice({
  payload
}: IUpdateScheduleInvoiceRequestAction) {
  try {
    const { schedule, invoice, data } = payload

    const response: AxiosResponse<IInvoice> = yield call(
      api.put,
      `schedules/${schedule.id}/invoices/${invoice.id}`,
      data
    )

    yield put(editScheduleInvoiceSuccess(schedule, response.data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(editScheduleInvoiceFailure(message))
  }
}

function* deleteScheduleInvoice({
  payload
}: IDeleteScheduleInvoiceRequestAction) {
  try {
    const { schedule, invoice } = payload

    yield call(api.delete, `schedules/${schedule.id}/invoices/${invoice.id}`)

    yield put(deleteScheduleInvoiceSuccess(schedule, invoice))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(deleteScheduleInvoiceFailure(message))
  }
}

function* cancelScheduleInvoice({
  payload
}: ICancelScheduleInvoiceRequestAction) {
  try {
    const { schedule, invoice } = payload

    const { data }: AxiosResponse<IInvoice> = yield call(
      api.put,
      `schedules/${schedule.id}/invoices/${invoice.id}/cancel`
    )

    yield put(cancelScheduleInvoiceSuccess(schedule, data))
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(cancelScheduleInvoiceFailure(message))
  }
}

function* moveScheduleInvoice({ payload }: IMoveScheduleInvoiceRequestAction) {
  try {
    const { originSchedule, invoice, destinationSchedule } = payload

    const { data }: AxiosResponse<IMoveInvoiceResult> = yield call(
      api.put,
      `schedules/${originSchedule.id}/invoices/${invoice.id}/move/${destinationSchedule.id}`
    )

    yield put(
      moveScheduleInvoiceSuccess(data.originSchedule, data.destinationSchedule)
    )
  } catch (error) {
    const message = extractErrorMessage(error)

    yield put(moveScheduleInvoiceFailure(message))
  }
}

function* markScheduleInvoiceAsReceived({
  payload
}: IMarkScheduleInvoiceAsNonReceivedRequestAction) {
  try {
    const { schedule, invoice } = payload

    const { data }: AxiosResponse<IInvoice> = yield call(
      api.put,
      `/schedules/${schedule.id}/invoices/${invoice.id}/receive`
    )

    yield put(markScheduleInvoiceAsNonReceivedSuccess(schedule, data))
  } catch (err) {
    const message = extractErrorMessage(err)

    yield put(markScheduleInvoiceAsNonReceivedFailure(message))
  }
}

function* markScheduleInvoiceAsNonReceived({
  payload
}: IMarkScheduleInvoiceAsReceivedRequestAction) {
  try {
    const { schedule, invoice } = payload

    const { data }: AxiosResponse<IInvoice> = yield call(
      api.put,
      `/schedules/${schedule.id}/invoices/${invoice.id}/nonReceive`
    )

    yield put(markScheduleInvoiceAsReceivedSuccess(schedule, data))
  } catch (err) {
    const message = extractErrorMessage(err)

    yield put(markScheduleInvoiceAsReceivedFailure(message))
  }
}

export default all([
  takeLatest(Types.ADD_SCHEDULES_REQUEST, addSchedule),
  takeLatest(Types.UPDATE_SCHEDULES_REQUEST, updateSchedule),
  takeLatest(Types.RESCHEDULE_SCHEDULES_REQUEST, rescheduleSchedule),
  takeLatest(Types.DELETE_SCHEDULES_REQUEST, deleteSchedule),
  takeLatest(Types.CANCEL_SCHEDULES_REQUEST, cancelSchedule),
  takeLatest(Types.CLOSE_SCHEDULES_REQUEST, closeSchedule),
  takeLatest(Types.LOAD_SCHEDULES_REQUEST, loadSchedules),
  takeLatest(Types.ADD_SCHEDULE_INVOICES_REQUEST, addScheduleInvoice),
  takeLatest(Types.UPDATE_SCHEDULE_INVOICES_REQUEST, updateScheduleInvoice),
  takeLatest(Types.DELETE_SCHEDULE_INVOICES_REQUEST, deleteScheduleInvoice),
  takeLatest(Types.CANCEL_SCHEDULE_INVOICES_REQUEST, cancelScheduleInvoice),
  takeLatest(Types.MOVE_SCHEDULE_INVOICES_REQUEST, moveScheduleInvoice),
  takeLatest(
    Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_REQUEST,
    markScheduleInvoiceAsReceived
  ),
  takeLatest(
    Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_REQUEST,
    markScheduleInvoiceAsNonReceived
  )
])
