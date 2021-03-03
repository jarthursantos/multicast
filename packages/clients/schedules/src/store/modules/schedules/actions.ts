import {
  IApplyScheduleFiltersAction,
  IClearScheduleFiltersAction,
  ILoadSchedulesFailureAction,
  ILoadSchedulesRequestAction,
  ILoadSchedulesSuccessAction,
  IAddScheduleFailureAction,
  IAddScheduleRequestAction,
  IAddScheduleSuccessAction,
  ICreateScheduleData,
  IUpdateScheduleData,
  IUpdateScheduleRequestAction,
  IUpdateScheduleSuccessAction,
  IUpdateScheduleFailureAction,
  IRescheduleScheduleData,
  IRescheduleScheduleRequestAction,
  IRescheduleScheduleSuccessAction,
  IRescheduleScheduleFailureAction,
  IAddScheduleInvoiceFailureAction,
  IAddScheduleInvoiceRequestAction,
  IAddScheduleInvoiceSuccessAction,
  IUpdateScheduleInvoiceFailureAction,
  IUpdateScheduleInvoiceRequestAction,
  IUpdateScheduleInvoiceSuccessAction,
  ICloseScheduleFailureAction,
  ICloseScheduleRequestAction,
  ICloseScheduleSuccessAction,
  IDeleteScheduleFailureAction,
  IDeleteScheduleRequestAction,
  IDeleteScheduleSuccessAction,
  ISchedule,
  IScheduleFilters,
  Types,
  IInvoice,
  ICreateInvoiceData,
  IUpdateInvoiceData,
  ICancelScheduleData,
  ICancelScheduleRequestAction,
  ICancelScheduleSuccessAction,
  ICancelScheduleFailureAction,
  IDeleteScheduleInvoiceRequestAction,
  IDeleteScheduleInvoiceSuccessAction,
  IDeleteScheduleInvoiceFailureAction,
  ICancelScheduleInvoiceRequestAction,
  ICancelScheduleInvoiceSuccessAction,
  ICancelScheduleInvoiceFailureAction,
  IMoveScheduleInvoiceRequestAction,
  IMoveScheduleInvoiceSuccessAction,
  IMoveScheduleInvoiceFailureAction,
  IMarkScheduleInvoiceAsNonReceivedFailureAction,
  IMarkScheduleInvoiceAsNonReceivedRequestAction,
  IMarkScheduleInvoiceAsNonReceivedSuccessAction,
  IMarkScheduleInvoiceAsReceivedFailureAction,
  IMarkScheduleInvoiceAsReceivedRequestAction,
  IMarkScheduleInvoiceAsReceivedSuccessAction,
  IReceiveScheduleRequestAction,
  IReceiveScheduleFailureAction,
  IReceiveScheduleSuccessAction,
  IReceiveScheduleData
} from './types'

// #region Filters

export function applyScheduleFilters(
  filters: IScheduleFilters
): IApplyScheduleFiltersAction {
  return {
    propagate: true,
    type: Types.APPLY_SCHEDULE_FILTERS,
    payload: { filters }
  }
}

export function clearScheduleFilters(): IClearScheduleFiltersAction {
  return {
    propagate: true,
    type: Types.CLEAR_SCHEDULE_FILTERS
  }
}

// #endregion

// #region Add

export function addScheduleRequest(
  schedule: ICreateScheduleData
): IAddScheduleRequestAction {
  return {
    type: Types.ADD_SCHEDULES_REQUEST,
    payload: { schedule }
  }
}

export function addScheduleSuccess(
  schedule: ISchedule
): IAddScheduleSuccessAction {
  return {
    propagate: true,
    type: Types.ADD_SCHEDULES_SUCCESS,
    payload: { schedule }
  }
}

export function addScheduleFailure(message: string): IAddScheduleFailureAction {
  return {
    type: Types.ADD_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Update

export function updateScheduleRequest(
  schedule: ISchedule,
  data: IUpdateScheduleData
): IUpdateScheduleRequestAction {
  return {
    type: Types.UPDATE_SCHEDULES_REQUEST,
    payload: { schedule, data }
  }
}

export function updateScheduleSuccess(
  schedule: ISchedule,
  updatedSchedule: ISchedule
): IUpdateScheduleSuccessAction {
  return {
    propagate: true,
    type: Types.UPDATE_SCHEDULES_SUCCESS,
    payload: { schedule, updatedSchedule }
  }
}

export function updateScheduleFailure(
  message: string
): IUpdateScheduleFailureAction {
  return {
    type: Types.UPDATE_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Close

export function closeScheduleRequest(
  schedule: ISchedule
): ICloseScheduleRequestAction {
  return {
    type: Types.CLOSE_SCHEDULES_REQUEST,
    payload: { schedule }
  }
}

export function closeScheduleSuccess(
  schedule: ISchedule,
  closedSchedule: ISchedule
): ICloseScheduleSuccessAction {
  return {
    propagate: true,
    type: Types.CLOSE_SCHEDULES_SUCCESS,
    payload: { schedule, closedSchedule }
  }
}

export function closeScheduleFailure(
  message: string
): ICloseScheduleFailureAction {
  return {
    type: Types.CLOSE_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Delete

export function deleteScheduleRequest(
  schedule: ISchedule
): IDeleteScheduleRequestAction {
  return {
    type: Types.DELETE_SCHEDULES_REQUEST,
    payload: { schedule }
  }
}

export function deleteScheduleSuccess(
  schedule: ISchedule
): IDeleteScheduleSuccessAction {
  return {
    propagate: true,
    type: Types.DELETE_SCHEDULES_SUCCESS,
    payload: { schedule }
  }
}

export function deleteScheduleFailure(
  message: string
): IDeleteScheduleFailureAction {
  return {
    type: Types.DELETE_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Cancel

export function cancelScheduleRequest(
  schedule: ISchedule,
  data: ICancelScheduleData
): ICancelScheduleRequestAction {
  return {
    type: Types.CANCEL_SCHEDULES_REQUEST,
    payload: { schedule, data }
  }
}

export function cancelScheduleSuccess(
  schedule: ISchedule,
  canceledSchedule: ISchedule
): ICancelScheduleSuccessAction {
  return {
    propagate: true,
    type: Types.CANCEL_SCHEDULES_SUCCESS,
    payload: { schedule, canceledSchedule }
  }
}

export function cancelScheduleFailure(
  message: string
): ICancelScheduleFailureAction {
  return {
    type: Types.CANCEL_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Receive

export function receiveScheduleRequest(
  schedule: ISchedule,
  data: IReceiveScheduleData
): IReceiveScheduleRequestAction {
  return {
    type: Types.RECEIVE_SCHEDULES_REQUEST,
    payload: { schedule, data }
  }
}

export function receiveScheduleSuccess(
  schedule: ISchedule,
  receivedSchedule: ISchedule
): IReceiveScheduleSuccessAction {
  return {
    propagate: true,
    type: Types.RECEIVE_SCHEDULES_SUCCESS,
    payload: { schedule, receivedSchedule }
  }
}

export function receiveScheduleFailure(
  message: string
): IReceiveScheduleFailureAction {
  return {
    type: Types.RECEIVE_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Reschedule

export function rescheduleScheduleRequest(
  schedule: ISchedule,
  data: IRescheduleScheduleData
): IRescheduleScheduleRequestAction {
  return {
    type: Types.RESCHEDULE_SCHEDULES_REQUEST,
    payload: { schedule, data }
  }
}

export function rescheduleScheduleSuccess(
  schedule: ISchedule,
  rescheduledSchedule: ISchedule
): IRescheduleScheduleSuccessAction {
  return {
    propagate: true,
    type: Types.RESCHEDULE_SCHEDULES_SUCCESS,
    payload: { schedule, rescheduledSchedule }
  }
}

export function rescheduleScheduleFailure(
  message: string
): IRescheduleScheduleFailureAction {
  return {
    type: Types.RESCHEDULE_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Add Invoice

export function addScheduleInvoiceRequest(
  schedule: ISchedule,
  data: ICreateInvoiceData
): IAddScheduleInvoiceRequestAction {
  return {
    type: Types.ADD_SCHEDULE_INVOICES_REQUEST,
    payload: { schedule, data }
  }
}

export function addScheduleInvoiceSuccess(
  schedule: ISchedule,
  invoice: IInvoice
): IAddScheduleInvoiceSuccessAction {
  return {
    propagate: true,
    type: Types.ADD_SCHEDULE_INVOICES_SUCCESS,
    payload: { schedule, invoice }
  }
}

export function addScheduleInvoiceFailure(
  message: string
): IAddScheduleInvoiceFailureAction {
  return {
    type: Types.ADD_SCHEDULE_INVOICES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Update Invoice

export function editScheduleInvoiceRequest(
  schedule: ISchedule,
  invoice: IInvoice,
  data: IUpdateInvoiceData
): IUpdateScheduleInvoiceRequestAction {
  return {
    type: Types.UPDATE_SCHEDULE_INVOICES_REQUEST,
    payload: { schedule, invoice, data }
  }
}

export function editScheduleInvoiceSuccess(
  schedule: ISchedule,
  invoice: IInvoice
): IUpdateScheduleInvoiceSuccessAction {
  return {
    propagate: true,
    type: Types.UPDATE_SCHEDULE_INVOICES_SUCCESS,
    payload: { schedule, invoice }
  }
}

export function editScheduleInvoiceFailure(
  message: string
): IUpdateScheduleInvoiceFailureAction {
  return {
    type: Types.UPDATE_SCHEDULE_INVOICES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Delete Invoice

export function deleteScheduleInvoiceRequest(
  schedule: ISchedule,
  invoice: IInvoice
): IDeleteScheduleInvoiceRequestAction {
  return {
    type: Types.DELETE_SCHEDULE_INVOICES_REQUEST,
    payload: { schedule, invoice }
  }
}

export function deleteScheduleInvoiceSuccess(
  schedule: ISchedule,
  deletedInvoice: IInvoice
): IDeleteScheduleInvoiceSuccessAction {
  return {
    propagate: true,
    type: Types.DELETE_SCHEDULE_INVOICES_SUCCESS,
    payload: { schedule, deletedInvoice }
  }
}

export function deleteScheduleInvoiceFailure(
  message: string
): IDeleteScheduleInvoiceFailureAction {
  return {
    type: Types.DELETE_SCHEDULE_INVOICES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Cancel Invoice

export function cancelScheduleInvoiceRequest(
  schedule: ISchedule,
  invoice: IInvoice
): ICancelScheduleInvoiceRequestAction {
  return {
    type: Types.CANCEL_SCHEDULE_INVOICES_REQUEST,
    payload: { schedule, invoice }
  }
}

export function cancelScheduleInvoiceSuccess(
  schedule: ISchedule,
  canceledInvoice: IInvoice
): ICancelScheduleInvoiceSuccessAction {
  return {
    propagate: true,
    type: Types.CANCEL_SCHEDULE_INVOICES_SUCCESS,
    payload: { schedule, canceledInvoice }
  }
}

export function cancelScheduleInvoiceFailure(
  message: string
): ICancelScheduleInvoiceFailureAction {
  return {
    type: Types.CANCEL_SCHEDULE_INVOICES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Move Invoice

export function moveScheduleInvoiceRequest(
  originSchedule: ISchedule,
  invoice: IInvoice,
  destinationSchedule: ISchedule
): IMoveScheduleInvoiceRequestAction {
  return {
    type: Types.MOVE_SCHEDULE_INVOICES_REQUEST,
    payload: { originSchedule, invoice, destinationSchedule }
  }
}

export function moveScheduleInvoiceSuccess(
  originSchedule: ISchedule,
  destinationSchedule: ISchedule
): IMoveScheduleInvoiceSuccessAction {
  return {
    propagate: true,
    type: Types.MOVE_SCHEDULE_INVOICES_SUCCESS,
    payload: { originSchedule, destinationSchedule }
  }
}

export function moveScheduleInvoiceFailure(
  message: string
): IMoveScheduleInvoiceFailureAction {
  return {
    type: Types.MOVE_SCHEDULE_INVOICES_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Mark Invoice as Received

export function markScheduleInvoiceAsReceivedRequest(
  schedule: ISchedule,
  invoice: IInvoice
): IMarkScheduleInvoiceAsReceivedRequestAction {
  return {
    type: Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_REQUEST,
    payload: { schedule, invoice }
  }
}

export function markScheduleInvoiceAsReceivedSuccess(
  schedule: ISchedule,
  invoice: IInvoice
): IMarkScheduleInvoiceAsReceivedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_SUCCESS,
    payload: { schedule, invoice }
  }
}

export function markScheduleInvoiceAsReceivedFailure(
  message: string
): IMarkScheduleInvoiceAsReceivedFailureAction {
  return {
    type: Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Mark Invoice as Non Received

export function markScheduleInvoiceAsNonReceivedRequest(
  schedule: ISchedule,
  invoice: IInvoice
): IMarkScheduleInvoiceAsNonReceivedRequestAction {
  return {
    type: Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_REQUEST,
    payload: { schedule, invoice }
  }
}

export function markScheduleInvoiceAsNonReceivedSuccess(
  schedule: ISchedule,
  invoice: IInvoice
): IMarkScheduleInvoiceAsNonReceivedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_SUCCESS,
    payload: { schedule, invoice }
  }
}

export function markScheduleInvoiceAsNonReceivedFailure(
  message: string
): IMarkScheduleInvoiceAsNonReceivedFailureAction {
  return {
    type: Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Load

export function loadSchedulesRequest(
  year: number,
  month: number
): ILoadSchedulesRequestAction {
  return {
    type: Types.LOAD_SCHEDULES_REQUEST,
    payload: { year, month }
  }
}

export function loadSchedulesSuccess(
  schedules: ISchedule[]
): ILoadSchedulesSuccessAction {
  return {
    propagate: true,
    type: Types.LOAD_SCHEDULES_SUCCESS,
    payload: { schedules }
  }
}

export function loadSchedulesFailure(
  message: string
): ILoadSchedulesFailureAction {
  return {
    type: Types.LOAD_SCHEDULES_FAILURE,
    payload: { message }
  }
}

// #endregion
