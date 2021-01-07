import { User } from '@shared/web-pages'

import { BaseAction } from '../types'

export enum Types {
  LOAD_ACCOMPANIMENTS_REQUEST = '@accompaniments/LOAD_ACCOMPANIMENTS_REQUEST',
  LOAD_ACCOMPANIMENTS_SUCCESS = '@accompaniments/LOAD_ACCOMPANIMENTS_SUCCESS',
  LOAD_ACCOMPANIMENTS_FAILURE = '@accompaniments/LOAD_ACCOMPANIMENTS_FAILURE',

  UPDATE_ACCOMPANIMENT_REQUEST = '@accompaniments/UPDATE_ACCOMPANIMENT_REQUEST',
  UPDATE_ACCOMPANIMENT_SUCCESS = '@accompaniments/UPDATE_ACCOMPANIMENT_SUCCESS',
  UPDATE_ACCOMPANIMENT_FAILURE = '@accompaniments/UPDATE_ACCOMPANIMENT_FAILURE',

  RENEW_ACCOMPANIMENT_REQUEST = '@accompaniments/RENEW_ACCOMPANIMENT_REQUEST',
  RENEW_ACCOMPANIMENT_SUCCESS = '@accompaniments/RENEW_ACCOMPANIMENT_SUCCESS',
  RENEW_ACCOMPANIMENT_FAILURE = '@accompaniments/RENEW_ACCOMPANIMENT_FAILURE',

  CANCEL_ACCOMPANIMENT_REQUEST = '@accompaniments/CANCEL_ACCOMPANIMENT_REQUEST',
  CANCEL_ACCOMPANIMENT_SUCCESS = '@accompaniments/CANCEL_ACCOMPANIMENT_SUCCESS',
  CANCEL_ACCOMPANIMENT_FAILURE = '@accompaniments/CANCEL_ACCOMPANIMENT_FAILURE',

  ADD_ANNOTATION_REQUEST = '@accompaniments/ADD_ANNOTATION_REQUEST',
  ADD_ANNOTATION_SUCCESS = '@accompaniments/ADD_ANNOTATION_SUCCESS',
  ADD_ANNOTATION_FAILURE = '@accompaniments/ADD_ANNOTATION_FAILURE',

  MARK_ACCOMPANIMENT_SENDED_REQUEST = '@accompaniments/MARK_ACCOMPANIMENT_SENDED_REQUEST',
  MARK_ACCOMPANIMENT_SENDED_SUCCESS = '@accompaniments/MARK_ACCOMPANIMENT_SENDED_SUCCESS',
  MARK_ACCOMPANIMENT_SENDED_FAILURE = '@accompaniments/MARK_ACCOMPANIMENT_SENDED_FAILURE',

  MARK_ACCOMPANIMENT_REVIEWED_REQUEST = '@accompaniments/MARK_ACCOMPANIMENT_REVIEWED_REQUEST',
  MARK_ACCOMPANIMENT_REVIEWED_SUCCESS = '@accompaniments/MARK_ACCOMPANIMENT_REVIEWED_SUCCESS',
  MARK_ACCOMPANIMENT_REVIEWED_FAILURE = '@accompaniments/MARK_ACCOMPANIMENT_REVIEWED_FAILURE',

  MARK_ACCOMPANIMENT_RELEASED_REQUEST = '@accompaniments/MARK_ACCOMPANIMENT_RELEASED_REQUEST',
  MARK_ACCOMPANIMENT_RELEASED_SUCCESS = '@accompaniments/MARK_ACCOMPANIMENT_RELEASED_SUCCESS',
  MARK_ACCOMPANIMENT_RELEASED_FAILURE = '@accompaniments/MARK_ACCOMPANIMENT_RELEASED_FAILURE',

  FILTER_ACCOMPANIMENT_REQUEST = '@accompaniments/FILTER_ACCOMPANIMENT_REQUEST',

  CLEAR_FILTER_ACCOMPANIMENT_REQUEST = '@accompaniments/CLEAR_FILTER_ACCOMPANIMENT_REQUEST'
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

export interface RenewAccompanimentRequestAction extends BaseAction {
  type: typeof Types.RENEW_ACCOMPANIMENT_REQUEST
  payload: {
    id: string
  }
}

export interface RenewAccompanimentSuccessAction extends BaseAction {
  type: typeof Types.RENEW_ACCOMPANIMENT_SUCCESS
  payload: {
    accompaniment: Accompaniment
    renewedAccompaniment: Accompaniment
  }
}

export interface RenewAccompanimentFailureAction extends BaseAction {
  type: typeof Types.RENEW_ACCOMPANIMENT_FAILURE
  payload: {
    message: string
  }
}

export interface CancelAccompanimentRequestAction extends BaseAction {
  type: typeof Types.CANCEL_ACCOMPANIMENT_REQUEST
  payload: {
    id: string
    motive: string
  }
}

export interface CancelAccompanimentSuccessAction extends BaseAction {
  type: typeof Types.CANCEL_ACCOMPANIMENT_SUCCESS
  payload: {
    id: string
  }
}

export interface CancelAccompanimentFailureAction extends BaseAction {
  type: typeof Types.CANCEL_ACCOMPANIMENT_FAILURE
  payload: {
    message: string
  }
}

export interface AddAnnotationRequestAction extends BaseAction {
  type: typeof Types.ADD_ANNOTATION_REQUEST
  payload: {
    id: string
    data: AnnotationContent
  }
}

export interface AddAnnotationSuccessAction extends BaseAction {
  type: typeof Types.ADD_ANNOTATION_SUCCESS
  payload: {
    id: string
    annotation: Annotation
  }
}

export interface AddAnnotationFailureAction extends BaseAction {
  type: typeof Types.ADD_ANNOTATION_FAILURE
  payload: {
    message: string
  }
}

export interface MarkAccompanimentAsSendedRequestAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_SENDED_REQUEST
  payload: {
    id: string
  }
}

export interface MarkAccompanimentAsSendedSuccessAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS
  payload: {
    accompaniment: Accompaniment
  }
}

export interface MarkAccompanimentAsSendedFailureAction extends BaseAction {
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

export interface MarkAccompanimentAsReleasedRequestAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_RELEASED_REQUEST
  payload: {
    id: string
  }
}

export interface MarkAccompanimentAsReleasedSuccessAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS
  payload: {
    accompaniment: Accompaniment
  }
}

export interface MarkAccompanimentAsReleasedFailureAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_RELEASED_FAILURE
  payload: {
    message: string
  }
}

export interface FilterAccompanimentRequestAction extends BaseAction {
  type: typeof Types.FILTER_ACCOMPANIMENT_REQUEST
  payload: {
    filter: AccompanimentFilters
  }
}

export interface ClearFilterAccompanimentRequestAction extends BaseAction {
  type: typeof Types.CLEAR_FILTER_ACCOMPANIMENT_REQUEST
}

export type AccompanimentsActionTypes =
  | LoadAccompanimentsRequestAction
  | LoadAccompanimentsFailureAction
  | LoadAccompanimentsSuccessAction
  | UpdateAccompanimentRequestAction
  | UpdateAccompanimentFailureAction
  | UpdateAccompanimentSuccessAction
  | RenewAccompanimentRequestAction
  | RenewAccompanimentFailureAction
  | RenewAccompanimentSuccessAction
  | CancelAccompanimentRequestAction
  | CancelAccompanimentFailureAction
  | CancelAccompanimentSuccessAction
  | AddAnnotationRequestAction
  | AddAnnotationSuccessAction
  | AddAnnotationFailureAction
  | MarkAccompanimentAsSendedRequestAction
  | MarkAccompanimentAsSendedSuccessAction
  | MarkAccompanimentAsSendedFailureAction
  | MarkAccompanimentAsReviewedRequestAction
  | MarkAccompanimentAsReviewedSuccessAction
  | MarkAccompanimentAsReviewedFailureAction
  | MarkAccompanimentAsReleasedRequestAction
  | MarkAccompanimentAsReleasedSuccessAction
  | MarkAccompanimentAsReleasedFailureAction
  | FilterAccompanimentRequestAction
  | ClearFilterAccompanimentRequestAction

export interface AccompanimentsState {
  loading: boolean
  accompaniments: Accompaniment[]

  updatingAccompaniment: boolean
  additingAnnotation: boolean
  renewingAccompaniment: boolean
  cancelingAccompaniment: boolean

  markingAsSended: boolean
  markingAsReviewed: boolean
  markingAsReleased: boolean

  filters: AccompanimentFilters
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
  renewedAt?: Date
  valueDelivered: number
  isOutstanding: boolean

  invoiceId: string
  invoice?: Invoice
  invoiceNumber?: number

  transactionNumber?: number

  delay: number
  criticalLevel: CriticalLevel

  createdAt: Date
  updatedAt: Date

  annotations: Annotation[]

  purchaseOrder: PurchaseOrder
  schedule: Schedule
}

export interface AccompanimentFilters {
  numberFrom?: number
  numberTo?: number
  buyerCode?: number
  providerCode?: number
  emittedFrom?: number
  emittedTo?: number
}

export enum CriticalLevel {
  NORMAL = 'NORMAL',
  ALERT = 'ALERT',
  DANGER = 'DANGER'
}

export interface Schedule {
  scheduledAt: Date
  shippingName: string
}

export interface Invoice {
  emittedAt: Date
  number: number
  value: number
}

export interface UntrackedInvoice {
  number: number
  emittedAt: Date
  amountValue: number
  providerCode: number
  transactionNumber: number
}

export interface AnnotationContent {
  content: string
}

export interface Annotation extends AnnotationContent {
  id: string
  user: User
  createdAt: Date | string
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
