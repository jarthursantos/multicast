import { BaseAction } from '../types'

export enum Types {
  LOAD_ACCOMPANIMENTS_REQUEST = '@accompaniments/LOAD_ACCOMPANIMENTS_REQUEST',
  LOAD_ACCOMPANIMENTS_SUCCESS = '@accompaniments/LOAD_ACCOMPANIMENTS_SUCCESS',
  LOAD_ACCOMPANIMENTS_FAILURE = '@accompaniments/LOAD_ACCOMPANIMENTS_FAILURE',

  UPDATE_ACCOMPANIMENT_REQUEST = '@accompaniments/UPDATE_ACCOMPANIMENT_REQUEST',
  UPDATE_ACCOMPANIMENT_SUCCESS = '@accompaniments/UPDATE_ACCOMPANIMENT_SUCCESS',
  UPDATE_ACCOMPANIMENT_FAILURE = '@accompaniments/UPDATE_ACCOMPANIMENT_FAILURE',

  MARK_ACCOMPANIMENT_SENDED_REQUEST = '@accompaniments/MARK_ACCOMPANIMENT_SENDED_REQUEST',
  MARK_ACCOMPANIMENT_SENDED_SUCCESS = '@accompaniments/MARK_ACCOMPANIMENT_SENDED_SUCCESS',
  MARK_ACCOMPANIMENT_SENDED_FAILURE = '@accompaniments/MARK_ACCOMPANIMENT_SENDED_FAILURE',

  MARK_ACCOMPANIMENT_REVIEWED_REQUEST = '@accompaniments/MARK_ACCOMPANIMENT_REVIEWED_REQUEST',
  MARK_ACCOMPANIMENT_REVIEWED_SUCCESS = '@accompaniments/MARK_ACCOMPANIMENT_REVIEWED_SUCCESS',
  MARK_ACCOMPANIMENT_REVIEWED_FAILURE = '@accompaniments/MARK_ACCOMPANIMENT_REVIEWED_FAILURE',

  MARK_ACCOMPANIMENT_RELEASED_REQUEST = '@accompaniments/MARK_ACCOMPANIMENT_RELEASED_REQUEST',
  MARK_ACCOMPANIMENT_RELEASED_SUCCESS = '@accompaniments/MARK_ACCOMPANIMENT_RELEASED_SUCCESS',
  MARK_ACCOMPANIMENT_RELEASED_FAILURE = '@accompaniments/MARK_ACCOMPANIMENT_RELEASED_FAILURE'
}

export interface LoadAccompanimentsRequestAction extends BaseAction {
  type: typeof Types.LOAD_ACCOMPANIMENTS_REQUEST
}

export interface LoadAccompanimentsFailureAction extends BaseAction {
  type: typeof Types.LOAD_ACCOMPANIMENTS_FAILURE
  payload: {
    message: string
  }
}

export interface LoadAccompanimentsSuccessAction extends BaseAction {
  type: typeof Types.LOAD_ACCOMPANIMENTS_SUCCESS
  payload: {
    accompaniments: Accompaniment[]
  }
}

export interface UpdateAccompanimentRequestAction extends BaseAction {
  type: typeof Types.UPDATE_ACCOMPANIMENT_REQUEST
  payload: {
    id: string
    data: Accompaniment
  }
}

export interface UpdateAccompanimentSuccessAction extends BaseAction {
  type: typeof Types.UPDATE_ACCOMPANIMENT_SUCCESS
  payload: {
    accompaniment: Accompaniment
  }
}

export interface UpdateAccompanimentFailureAction extends BaseAction {
  type: typeof Types.UPDATE_ACCOMPANIMENT_FAILURE
  payload: {
    message: string
  }
}

export interface MarkAccompanimentAsSendRequestAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_SENDED_REQUEST
  payload: {
    id: string
  }
}

export interface MarkAccompanimentAsSendSuccessAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS
  payload: {
    accompaniment: Accompaniment
  }
}

export interface MarkAccompanimentAsSendFailureAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_SENDED_FAILURE
  payload: {
    message: string
  }
}

export interface MarkAccompanimentAsReviewedRequestAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_REVIEWED_REQUEST
  payload: {
    id: string
  }
}

export interface MarkAccompanimentAsReviewedSuccessAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS
  payload: {
    accompaniment: Accompaniment
  }
}

export interface MarkAccompanimentAsReviewedFailureAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_REVIEWED_FAILURE
  payload: {
    message: string
  }
}

export interface MarkAccompanimentAsReleadedRequestAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_RELEASED_REQUEST
  payload: {
    id: string
  }
}

export interface MarkAccompanimentAsReleadedSuccessAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS
  payload: {
    accompaniment: Accompaniment
  }
}

export interface MarkAccompanimentAsReleadedFailureAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_RELEASED_FAILURE
  payload: {
    message: string
  }
}

export type AccompanimentsActionTypes =
  | LoadAccompanimentsRequestAction
  | LoadAccompanimentsFailureAction
  | LoadAccompanimentsSuccessAction
  | UpdateAccompanimentRequestAction
  | UpdateAccompanimentFailureAction
  | UpdateAccompanimentSuccessAction
  | MarkAccompanimentAsSendRequestAction
  | MarkAccompanimentAsSendSuccessAction
  | MarkAccompanimentAsSendFailureAction
  | MarkAccompanimentAsReviewedRequestAction
  | MarkAccompanimentAsReviewedSuccessAction
  | MarkAccompanimentAsReviewedFailureAction
  | MarkAccompanimentAsReleadedRequestAction
  | MarkAccompanimentAsReleadedSuccessAction
  | MarkAccompanimentAsReleadedFailureAction

export interface AccompanimentsState {
  loading: boolean
  accompaniments: Accompaniment[]

  updatingAccompaniment: boolean

  markingAsSended: boolean
  markingAsReviewed: boolean
  markingAsReleased: boolean
}

export interface Accompaniment {
  id: string
  sendedAt?: Date
  reviewedAt?: Date
  releasedAt?: Date
  expectedBillingAt?: Date
  billingAt?: Date
  freeOnBoardAt?: Date
  schedulingAt?: Date
  valueDelivered: number

  invoiceId: string

  delay: number

  createdAt: Date
  updatedAt: Date

  purchaseOrder: PurchaseOrder
}

export interface PurchaseOrder {
  number: number
  amountValue: number
  deliveredValue: number
  emittedAt: Date
  freight: 'CIF' | 'FOB'
  isBonification: boolean
  buyer: {
    code: number
    name: string
  }
  provider: {
    code: number
    name: string
    cnpj: string
    principalCode: number
    fantasy: string
  }
}
