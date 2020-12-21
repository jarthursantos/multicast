import { IProvider } from '@shared/web-components/Form'

import { BaseAction } from '../types'

export enum Types {
  ADD_SCHEDULE_REQUESTS_REQUEST = '@schedule-requests/ADD_SCHEDULE_REQUESTS_REQUEST',
  ADD_SCHEDULE_REQUESTS_FAILURE = '@schedule-requests/ADD_SCHEDULE_REQUESTS_FAILURE',
  ADD_SCHEDULE_REQUESTS_SUCCESS = '@schedule-requests/ADD_SCHEDULE_REQUESTS_SUCCESS',

  UPDATE_SCHEDULE_REQUESTS_REQUEST = '@schedule-requests/UPDATE_SCHEDULE_REQUESTS_REQUEST',
  UPDATE_SCHEDULE_REQUESTS_FAILURE = '@schedule-requests/UPDATE_SCHEDULE_REQUESTS_FAILURE',
  UPDATE_SCHEDULE_REQUESTS_SUCCESS = '@schedule-requests/UPDATE_SCHEDULE_REQUESTS_SUCCESS',

  REMOVE_SCHEDULE_REQUESTS_REQUEST = '@schedule-requests/REMOVE_SCHEDULE_REQUESTS_REQUEST',
  REMOVE_SCHEDULE_REQUESTS_FAILURE = '@schedule-requests/REMOVE_SCHEDULE_REQUESTS_FAILURE',
  REMOVE_SCHEDULE_REQUESTS_SUCCESS = '@schedule-requests/REMOVE_SCHEDULE_REQUESTS_SUCCESS',

  LOAD_SCHEDULE_REQUESTS_REQUEST = '@schedule-requests/LOAD_SCHEDULE_REQUESTS_REQUEST',
  LOAD_SCHEDULE_REQUESTS_FAILURE = '@schedule-requests/LOAD_SCHEDULE_REQUESTS_FAILURE',
  LOAD_SCHEDULE_REQUESTS_SUCCESS = '@schedule-requests/LOAD_SCHEDULE_REQUESTS_SUCCESS'
}

export interface IAddScheduleRequestRequestAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULE_REQUESTS_REQUEST
  payload: {
    scheduleRequest: ICreateScheduleRequestData
  }
}

export interface IAddScheduleRequestSuccessAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULE_REQUESTS_SUCCESS
  payload: {
    scheduleRequest: IScheduleRequest
  }
}

export interface IAddScheduleRequestFailureAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULE_REQUESTS_FAILURE
  payload: {
    message: string
  }
}

export interface IUpdateScheduleRequestRequestAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULE_REQUESTS_REQUEST
  payload: {
    scheduleRequest: IScheduleRequest
    data: IUpdateScheduleRequestData
  }
}

export interface IUpdateScheduleRequestSuccessAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULE_REQUESTS_SUCCESS
  payload: {
    scheduleRequest: IScheduleRequest
    updatedScheduleRequest: IScheduleRequest
  }
}

export interface IUpdateScheduleRequestFailureAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULE_REQUESTS_FAILURE
  payload: {
    message: string
  }
}

export interface IRemoveScheduleRequestRequestAction extends BaseAction {
  type: typeof Types.REMOVE_SCHEDULE_REQUESTS_REQUEST
  payload: {
    scheduleRequest: IScheduleRequest
  }
}

export interface IRemoveScheduleRequestSuccessAction extends BaseAction {
  type: typeof Types.REMOVE_SCHEDULE_REQUESTS_SUCCESS
  payload: {
    scheduleRequest: IScheduleRequest
  }
}

export interface IRemoveScheduleRequestFailureAction extends BaseAction {
  type: typeof Types.REMOVE_SCHEDULE_REQUESTS_FAILURE
  payload: {
    message: string
  }
}

export interface ILoadScheduleRequestRequestAction extends BaseAction {
  type: typeof Types.LOAD_SCHEDULE_REQUESTS_REQUEST
}

export interface ILoadScheduleRequestSuccessAction extends BaseAction {
  type: typeof Types.LOAD_SCHEDULE_REQUESTS_SUCCESS
  payload: {
    scheduleRequests: IScheduleRequest[]
  }
}

export interface ILoadScheduleRequestFailureAction extends BaseAction {
  type: typeof Types.LOAD_SCHEDULE_REQUESTS_FAILURE
  payload: {
    message: string
  }
}

export type SchedulesActionTypes =
  | IAddScheduleRequestRequestAction
  | IAddScheduleRequestSuccessAction
  | IAddScheduleRequestFailureAction
  | IUpdateScheduleRequestRequestAction
  | IUpdateScheduleRequestSuccessAction
  | IUpdateScheduleRequestFailureAction
  | IRemoveScheduleRequestRequestAction
  | IRemoveScheduleRequestSuccessAction
  | IRemoveScheduleRequestFailureAction
  | ILoadScheduleRequestRequestAction
  | ILoadScheduleRequestSuccessAction
  | ILoadScheduleRequestFailureAction

export interface ScheduleRequestsState {
  scheduleRequests: IScheduleRequest[]

  additingScheduleRequest: boolean
  updatingScheduleRequest: boolean
  removingScheduleRequest: boolean
  loadingScheduleRequest: boolean
}

export interface IScheduleRequest {
  id: string
  requestedDate: Date
  provider: IProvider
}

export interface ICreateScheduleRequestData {
  requestedDate: Date
  providerCode: number
}

export type IUpdateScheduleRequestData = ICreateScheduleRequestData
