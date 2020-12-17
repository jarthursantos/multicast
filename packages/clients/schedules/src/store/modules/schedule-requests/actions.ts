import {
  IAddScheduleRequestRequestAction,
  IAddScheduleRequestFailureAction,
  IAddScheduleRequestSuccessAction,
  IUpdateScheduleRequestFailureAction,
  IUpdateScheduleRequestRequestAction,
  IUpdateScheduleRequestSuccessAction,
  IRemoveScheduleRequestFailureAction,
  IRemoveScheduleRequestRequestAction,
  IRemoveScheduleRequestSuccessAction,
  ILoadScheduleRequestFailureAction,
  ILoadScheduleRequestRequestAction,
  ILoadScheduleRequestSuccessAction,
  IScheduleRequest,
  Types,
  ICreateScheduleRequestData,
  IUpdateScheduleRequestData
} from './types'

// #region Add

export function addScheduleRequestRequest(
  scheduleRequest: ICreateScheduleRequestData
): IAddScheduleRequestRequestAction {
  return {
    type: Types.ADD_SCHEDULE_REQUESTS_REQUEST,
    payload: { scheduleRequest }
  }
}

export function addScheduleRequestSuccess(
  scheduleRequest: IScheduleRequest
): IAddScheduleRequestSuccessAction {
  return {
    propagate: true,
    type: Types.ADD_SCHEDULE_REQUESTS_SUCCESS,
    payload: { scheduleRequest }
  }
}

export function addScheduleRequestFailure(
  message: string
): IAddScheduleRequestFailureAction {
  return {
    type: Types.ADD_SCHEDULE_REQUESTS_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Update

export function updateScheduleRequestRequest(
  scheduleRequest: IScheduleRequest,
  data: IUpdateScheduleRequestData
): IUpdateScheduleRequestRequestAction {
  return {
    type: Types.UPDATE_SCHEDULE_REQUESTS_REQUEST,
    payload: { scheduleRequest, data }
  }
}

export function updateScheduleRequestSuccess(
  scheduleRequest: IScheduleRequest,
  updatedScheduleRequest: IScheduleRequest
): IUpdateScheduleRequestSuccessAction {
  return {
    propagate: true,
    type: Types.UPDATE_SCHEDULE_REQUESTS_SUCCESS,
    payload: { scheduleRequest, updatedScheduleRequest }
  }
}

export function updateScheduleRequestFailure(
  message: string
): IUpdateScheduleRequestFailureAction {
  return {
    type: Types.UPDATE_SCHEDULE_REQUESTS_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Remove

export function removeScheduleRequestRequest(
  scheduleRequest: IScheduleRequest
): IRemoveScheduleRequestRequestAction {
  return {
    type: Types.REMOVE_SCHEDULE_REQUESTS_REQUEST,
    payload: { scheduleRequest }
  }
}

export function removeScheduleRequestSuccess(
  scheduleRequest: IScheduleRequest
): IRemoveScheduleRequestSuccessAction {
  return {
    propagate: true,
    type: Types.REMOVE_SCHEDULE_REQUESTS_SUCCESS,
    payload: { scheduleRequest }
  }
}

export function removeScheduleRequestFailure(
  message: string
): IRemoveScheduleRequestFailureAction {
  return {
    type: Types.REMOVE_SCHEDULE_REQUESTS_FAILURE,
    payload: { message }
  }
}

// #endregion

// #region Load

export function loadScheduleRequestRequest(): ILoadScheduleRequestRequestAction {
  return {
    type: Types.LOAD_SCHEDULE_REQUESTS_REQUEST
  }
}

export function loadScheduleRequestSuccess(
  scheduleRequests: IScheduleRequest[]
): ILoadScheduleRequestSuccessAction {
  return {
    propagate: true,
    type: Types.LOAD_SCHEDULE_REQUESTS_SUCCESS,
    payload: { scheduleRequests }
  }
}

export function loadScheduleRequestFailure(
  message: string
): ILoadScheduleRequestFailureAction {
  return {
    type: Types.LOAD_SCHEDULE_REQUESTS_FAILURE,
    payload: { message }
  }
}

// #endregion
