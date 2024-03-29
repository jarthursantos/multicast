import { IProvider, IBuyer } from '@shared/web-components'
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

  MARK_ACCOMPANIMENT_FINISHED_REQUEST = '@accompaniments/MARK_ACCOMPANIMENT_FINISHED_REQUEST',
  MARK_ACCOMPANIMENT_FINISHED_SUCCESS = '@accompaniments/MARK_ACCOMPANIMENT_FINISHED_SUCCESS',
  MARK_ACCOMPANIMENT_FINISHED_FAILURE = '@accompaniments/MARK_ACCOMPANIMENT_FINISHED_FAILURE',

  APPLY_ACCOMPANIMENTS_FILTERS = '@accompaniments/APPLY_ACCOMPANIMENTS_FILTERS',
  CLEAR_ACCOMPANIMENTS_FILTERS = '@accompaniments/CLEAR_ACCOMPANIMENTS_FILTERS',

  INCLUDE_CANCELED_ACCOMPANIMENTS = '@accompaniments/INCLUDE_CANCELED_ACCOMPANIMENTS',
  CLEAR_CANCELED_ACCOMPANIMENTS = '@accompaniments/CLEAR_CANCELED_ACCOMPANIMENTS',

  LOAD_CANCELED_ACCOMPANIMENTS_REQUEST = '@accompaniments/LOAD_CANCELED_ACCOMPANIMENTS_REQUEST',
  LOAD_CANCELED_ACCOMPANIMENTS_SUCCESS = '@accompaniments/LOAD_CANCELED_ACCOMPANIMENTS_SUCCESS',
  LOAD_CANCELED_ACCOMPANIMENTS_FAILURE = '@accompaniments/LOAD_CANCELED_ACCOMPANIMENTS_FAILURE',

  LOAD_COMPLETED_ACCOMPANIMENTS_REQUEST = '@accompaniments/LOAD_COMPLETED_ACCOMPANIMENTS_REQUEST',
  LOAD_COMPLETED_ACCOMPANIMENTS_SUCCESS = '@accompaniments/LOAD_COMPLETED_ACCOMPANIMENTS_SUCCESS',
  LOAD_COMPLETED_ACCOMPANIMENTS_FAILURE = '@accompaniments/LOAD_COMPLETED_ACCOMPANIMENTS_FAILURE',

  INCLUDE_COMPLETED_ACCOMPANIMENTS = '@accompaniments/INCLUDE_COMPLETED_ACCOMPANIMENTS',
  CLEAR_COMPLETED_ACCOMPANIMENTS = '@accompaniments/CLEAR_COMPLETED_ACCOMPANIMENTS'
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

export interface MarkAccompanimentAsFinishedRequestAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_FINISHED_REQUEST
  payload: {
    id: string
  }
}

export interface MarkAccompanimentAsFinishedSuccessAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_FINISHED_SUCCESS
  payload: {
    accompaniment: Accompaniment
  }
}

export interface MarkAccompanimentAsFinishedFailureAction extends BaseAction {
  type: typeof Types.MARK_ACCOMPANIMENT_FINISHED_FAILURE
  payload: {
    message: string
  }
}

export interface ApplyAccompanimentFilterAction extends BaseAction {
  type: typeof Types.APPLY_ACCOMPANIMENTS_FILTERS
  payload: {
    filter: IAccompanimentFilters
  }
}

export interface ClearAccompanimentFilterAction extends BaseAction {
  type: typeof Types.CLEAR_ACCOMPANIMENTS_FILTERS
}

export interface LoadCanceledAccompanimentsRequestAction extends BaseAction {
  type: typeof Types.LOAD_CANCELED_ACCOMPANIMENTS_REQUEST
  payload: {
    filters: IAccompanimentFilters
  }
}

export interface LoadCanceledAccompanimentsSuccessAction extends BaseAction {
  type: typeof Types.LOAD_CANCELED_ACCOMPANIMENTS_SUCCESS
  payload: {
    accompaniments: Accompaniment[]
  }
}

export interface LoadCanceledAccompanimentsFailureAction extends BaseAction {
  type: typeof Types.LOAD_CANCELED_ACCOMPANIMENTS_FAILURE
  payload: {
    message: string
  }
}

export interface IncludeCanceledAccompanimentsAction extends BaseAction {
  type: typeof Types.INCLUDE_CANCELED_ACCOMPANIMENTS
  payload: {
    filters: IAccompanimentFilters
  }
}

export interface ClearCanceledAccompanimentsAction extends BaseAction {
  type: typeof Types.CLEAR_CANCELED_ACCOMPANIMENTS
}

export interface LoadCompletedAccompanimentsRequestAction extends BaseAction {
  type: typeof Types.LOAD_COMPLETED_ACCOMPANIMENTS_REQUEST
  payload: {
    filters: IAccompanimentFilters
  }
}

export interface LoadCompletedAccompanimentsSuccessAction extends BaseAction {
  type: typeof Types.LOAD_COMPLETED_ACCOMPANIMENTS_SUCCESS
  payload: {
    accompaniments: Accompaniment[]
  }
}

export interface LoadCompletedAccompanimentsFailureAction extends BaseAction {
  type: typeof Types.LOAD_COMPLETED_ACCOMPANIMENTS_FAILURE
  payload: {
    message: string
  }
}

export interface IncludeCompletedAccompanimentsAction extends BaseAction {
  type: typeof Types.INCLUDE_COMPLETED_ACCOMPANIMENTS
  payload: {
    filters: IAccompanimentFilters
  }
}

export interface ClearCompletedAccompanimentsAction extends BaseAction {
  type: typeof Types.CLEAR_COMPLETED_ACCOMPANIMENTS
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
  | MarkAccompanimentAsFinishedRequestAction
  | MarkAccompanimentAsFinishedSuccessAction
  | MarkAccompanimentAsFinishedFailureAction
  | ApplyAccompanimentFilterAction
  | ClearAccompanimentFilterAction
  | LoadCanceledAccompanimentsRequestAction
  | LoadCanceledAccompanimentsSuccessAction
  | LoadCanceledAccompanimentsFailureAction
  | IncludeCanceledAccompanimentsAction
  | ClearCanceledAccompanimentsAction
  | LoadCompletedAccompanimentsRequestAction
  | LoadCompletedAccompanimentsSuccessAction
  | LoadCompletedAccompanimentsFailureAction
  | IncludeCompletedAccompanimentsAction
  | ClearCompletedAccompanimentsAction

export interface AccompanimentsState {
  loading: boolean
  accompaniments: Accompaniment[]

  loadingCanceledAccompaniments: boolean
  canceledAccompaniments: Accompaniment[]

  loadingCompletedAccompaniments: boolean
  completedAccompaniments: Accompaniment[]

  updatingAccompaniment: boolean
  additingAnnotation: boolean
  renewingAccompaniment: boolean
  cancelingAccompaniment: boolean

  markingAsSended: boolean
  markingAsReviewed: boolean
  markingAsReleased: boolean
  markingAsFinished: boolean

  filters: IAccompanimentFilters

  includeCanceledAccompaniments: boolean
  includeCompletedAccompaniments: boolean
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
  finishedAt?: Date
  renewedAt?: Date
  valueDelivered: number
  isOutstanding: boolean

  invoiceId: string
  invoiceNumber?: number

  transactionNumber?: number

  delay: number
  criticalLevel: CriticalLevel

  createdAt: Date
  updatedAt: Date

  annotations: Annotation[]

  purchaseOrder: PurchaseOrder
  schedule?: Schedule
}

export interface IAccompanimentFilters {
  numberFrom?: number
  numberTo?: number
  buyers?: IBuyer[]
  providers?: IProvider[]
  periodFrom?: Date
  periodTo?: Date
}

export enum CriticalLevel {
  NORMAL = 'NORMAL',
  ALERT = 'ALERT',
  DANGER = 'DANGER'
}

export interface Schedule {
  scheduledAt: Date
  shippingName: string
  closedAt?: Date
  receivedAt?: Date
  downloadedAt?: Date
  unlockedAt?: Date
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
