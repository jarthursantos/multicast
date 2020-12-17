import { IProvider } from '@shared/web-components/Form'

import { IScheduleRequest } from '../schedule-requests/types'
import { BaseAction } from '../types'

export enum Types {
  APPLY_SCHEDULE_FILTERS = '@schedules/APPLY_SCHEDULE_FILTERS',
  CLEAR_SCHEDULE_FILTERS = '@schedules/CLEAR_SCHEDULE_FILTERS',

  ADD_SCHEDULES_REQUEST = '@schedules/ADD_SCHEDULES_REQUEST',
  ADD_SCHEDULES_SUCCESS = '@schedules/ADD_SCHEDULES_SUCCESS',
  ADD_SCHEDULES_FAILURE = '@schedules/ADD_SCHEDULES_FAILURE',

  UPDATE_SCHEDULES_REQUEST = '@schedules/UPDATE_SCHEDULES_REQUEST',
  UPDATE_SCHEDULES_SUCCESS = '@schedules/UPDATE_SCHEDULES_SUCCESS',
  UPDATE_SCHEDULES_FAILURE = '@schedules/UPDATE_SCHEDULES_FAILURE',

  RESCHEDULE_SCHEDULES_REQUEST = '@schedules/RESCHEDULE_SCHEDULES_REQUEST',
  RESCHEDULE_SCHEDULES_SUCCESS = '@schedules/RESCHEDULE_SCHEDULES_SUCCESS',
  RESCHEDULE_SCHEDULES_FAILURE = '@schedules/RESCHEDULE_SCHEDULES_FAILURE',

  CLOSE_SCHEDULES_REQUEST = '@schedules/CLOSE_SCHEDULES_REQUEST',
  CLOSE_SCHEDULES_SUCCESS = '@schedules/CLOSE_SCHEDULES_SUCCESS',
  CLOSE_SCHEDULES_FAILURE = '@schedules/CLOSE_SCHEDULES_FAILURE',

  DELETE_SCHEDULES_REQUEST = '@schedules/DELETE_SCHEDULES_REQUEST',
  DELETE_SCHEDULES_SUCCESS = '@schedules/DELETE_SCHEDULES_SUCCESS',
  DELETE_SCHEDULES_FAILURE = '@schedules/DELETE_SCHEDULES_FAILURE',

  CANCEL_SCHEDULES_REQUEST = '@schedules/CANCEL_SCHEDULES_REQUEST',
  CANCEL_SCHEDULES_SUCCESS = '@schedules/CANCEL_SCHEDULES_SUCCESS',
  CANCEL_SCHEDULES_FAILURE = '@schedules/CANCEL_SCHEDULES_FAILURE',

  ADD_SCHEDULE_INVOICES_REQUEST = '@schedules/ADD_SCHEDULE_INVOICES_REQUEST',
  ADD_SCHEDULE_INVOICES_SUCCESS = '@schedules/ADD_SCHEDULE_INVOICES_SUCCESS',
  ADD_SCHEDULE_INVOICES_FAILURE = '@schedules/ADD_SCHEDULE_INVOICES_FAILURE',

  UPDATE_SCHEDULE_INVOICES_REQUEST = '@schedules/UPDATE_SCHEDULE_INVOICES_REQUEST',
  UPDATE_SCHEDULE_INVOICES_SUCCESS = '@schedules/UPDATE_SCHEDULE_INVOICES_SUCCESS',
  UPDATE_SCHEDULE_INVOICES_FAILURE = '@schedules/UPDATE_SCHEDULE_INVOICES_FAILURE',

  DELETE_SCHEDULE_INVOICES_REQUEST = '@schedules/DELETE_SCHEDULE_INVOICES_REQUEST',
  DELETE_SCHEDULE_INVOICES_SUCCESS = '@schedules/DELETE_SCHEDULE_INVOICES_SUCCESS',
  DELETE_SCHEDULE_INVOICES_FAILURE = '@schedules/DELETE_SCHEDULE_INVOICES_FAILURE',

  CANCEL_SCHEDULE_INVOICES_REQUEST = '@schedules/CANCEL_SCHEDULE_INVOICES_REQUEST',
  CANCEL_SCHEDULE_INVOICES_SUCCESS = '@schedules/CANCEL_SCHEDULE_INVOICES_SUCCESS',
  CANCEL_SCHEDULE_INVOICES_FAILURE = '@schedules/CANCEL_SCHEDULE_INVOICES_FAILURE',

  MOVE_SCHEDULE_INVOICES_REQUEST = '@schedules/MOVE_SCHEDULE_INVOICES_REQUEST',
  MOVE_SCHEDULE_INVOICES_SUCCESS = '@schedules/MOVE_SCHEDULE_INVOICES_SUCCESS',
  MOVE_SCHEDULE_INVOICES_FAILURE = '@schedules/MOVE_SCHEDULE_INVOICES_FAILURE',

  MARK_AS_RECEIVED_SCHEDULE_INVOICE_REQUEST = '@schedules/MARK_AS_RECEIVED_SCHEDULE_INVOICE_REQUEST',
  MARK_AS_RECEIVED_SCHEDULE_INVOICE_SUCCESS = '@schedules/MARK_AS_RECEIVED_SCHEDULE_INVOICE_SUCCESS',
  MARK_AS_RECEIVED_SCHEDULE_INVOICE_FAILURE = '@schedules/MARK_AS_RECEIVED_SCHEDULE_INVOICE_FAILURE',

  MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_REQUEST = '@schedules/MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_REQUEST',
  MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_SUCCESS = '@schedules/MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_SUCCESS',
  MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_FAILURE = '@schedules/MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_FAILURE',

  LOAD_SCHEDULES_REQUEST = '@schedules/LOAD_SCHEDULES_REQUEST',
  LOAD_SCHEDULES_SUCCESS = '@schedules/LOAD_SCHEDULES_SUCCESS',
  LOAD_SCHEDULES_FAILURE = '@schedules/LOAD_SCHEDULES_FAILURE'
}

// #region Filters

export interface IApplyScheduleFiltersAction extends BaseAction {
  type: typeof Types.APPLY_SCHEDULE_FILTERS
  payload: {
    filters: IScheduleFilters
  }
}

export interface IClearScheduleFiltersAction extends BaseAction {
  type: typeof Types.CLEAR_SCHEDULE_FILTERS
}

// #endregion

// #region Add

export interface IAddScheduleRequestAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULES_REQUEST
  payload: { schedule: ICreateScheduleData }
}

export interface IAddScheduleSuccessAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULES_SUCCESS
  payload: { schedule: ISchedule }
}

export interface IAddScheduleFailureAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Update

export interface IUpdateScheduleRequestAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULES_REQUEST
  payload: { schedule: ISchedule; data: IUpdateScheduleData }
}

export interface IUpdateScheduleSuccessAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULES_SUCCESS
  payload: { schedule: ISchedule; updatedSchedule: ISchedule }
}

export interface IUpdateScheduleFailureAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Reschedule

export interface IRescheduleScheduleRequestAction extends BaseAction {
  type: typeof Types.RESCHEDULE_SCHEDULES_REQUEST
  payload: { schedule: ISchedule; data: IRescheduleScheduleData }
}

export interface IRescheduleScheduleSuccessAction extends BaseAction {
  type: typeof Types.RESCHEDULE_SCHEDULES_SUCCESS
  payload: { schedule: ISchedule; rescheduledSchedule: ISchedule }
}

export interface IRescheduleScheduleFailureAction extends BaseAction {
  type: typeof Types.RESCHEDULE_SCHEDULES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Close

export interface ICloseScheduleRequestAction extends BaseAction {
  type: typeof Types.CLOSE_SCHEDULES_REQUEST
  payload: { schedule: ISchedule }
}

export interface ICloseScheduleSuccessAction extends BaseAction {
  type: typeof Types.CLOSE_SCHEDULES_SUCCESS
  payload: { schedule: ISchedule; closedSchedule: ISchedule }
}

export interface ICloseScheduleFailureAction extends BaseAction {
  type: typeof Types.CLOSE_SCHEDULES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Delete

export interface IDeleteScheduleRequestAction extends BaseAction {
  type: typeof Types.DELETE_SCHEDULES_REQUEST
  payload: { schedule: ISchedule }
}

export interface IDeleteScheduleSuccessAction extends BaseAction {
  type: typeof Types.DELETE_SCHEDULES_SUCCESS
  payload: { schedule: ISchedule }
}

export interface IDeleteScheduleFailureAction extends BaseAction {
  type: typeof Types.DELETE_SCHEDULES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Cancel

export interface ICancelScheduleRequestAction extends BaseAction {
  type: typeof Types.CANCEL_SCHEDULES_REQUEST
  payload: {
    schedule: ISchedule
    data: ICancelScheduleData
  }
}

export interface ICancelScheduleSuccessAction extends BaseAction {
  type: typeof Types.CANCEL_SCHEDULES_SUCCESS
  payload: {
    schedule: ISchedule
    canceledSchedule: ISchedule
  }
}

export interface ICancelScheduleFailureAction extends BaseAction {
  type: typeof Types.CANCEL_SCHEDULES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Add Invoice

export interface IAddScheduleInvoiceRequestAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULE_INVOICES_REQUEST
  payload: {
    schedule: ISchedule
    data: ICreateInvoiceData
  }
}

export interface IAddScheduleInvoiceSuccessAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULE_INVOICES_SUCCESS
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface IAddScheduleInvoiceFailureAction extends BaseAction {
  type: typeof Types.ADD_SCHEDULE_INVOICES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Update Invoice

export interface IUpdateScheduleInvoiceRequestAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULE_INVOICES_REQUEST
  payload: {
    schedule: ISchedule
    invoice: IInvoice
    data: IUpdateInvoiceData
  }
}

export interface IUpdateScheduleInvoiceSuccessAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULE_INVOICES_SUCCESS
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface IUpdateScheduleInvoiceFailureAction extends BaseAction {
  type: typeof Types.UPDATE_SCHEDULE_INVOICES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Delete Invoice

export interface IDeleteScheduleInvoiceRequestAction extends BaseAction {
  type: typeof Types.DELETE_SCHEDULE_INVOICES_REQUEST
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface IDeleteScheduleInvoiceSuccessAction extends BaseAction {
  type: typeof Types.DELETE_SCHEDULE_INVOICES_SUCCESS
  payload: {
    schedule: ISchedule
    deletedInvoice: IInvoice
  }
}

export interface IDeleteScheduleInvoiceFailureAction extends BaseAction {
  type: typeof Types.DELETE_SCHEDULE_INVOICES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Cancel Invoice

export interface ICancelScheduleInvoiceRequestAction extends BaseAction {
  type: typeof Types.CANCEL_SCHEDULE_INVOICES_REQUEST
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface ICancelScheduleInvoiceSuccessAction extends BaseAction {
  type: typeof Types.CANCEL_SCHEDULE_INVOICES_SUCCESS
  payload: {
    schedule: ISchedule
    canceledInvoice: IInvoice
  }
}

export interface ICancelScheduleInvoiceFailureAction extends BaseAction {
  type: typeof Types.CANCEL_SCHEDULE_INVOICES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Move Invoice

export interface IMoveScheduleInvoiceRequestAction extends BaseAction {
  type: typeof Types.MOVE_SCHEDULE_INVOICES_REQUEST
  payload: {
    originSchedule: ISchedule
    invoice: IInvoice
    destinationSchedule: ISchedule
  }
}

export interface IMoveScheduleInvoiceSuccessAction extends BaseAction {
  type: typeof Types.MOVE_SCHEDULE_INVOICES_SUCCESS
  payload: {
    originSchedule: ISchedule
    destinationSchedule: ISchedule
  }
}

export interface IMoveScheduleInvoiceFailureAction extends BaseAction {
  type: typeof Types.MOVE_SCHEDULE_INVOICES_FAILURE
  payload: { message: string }
}

// #endregion

// #region Mark Invoice as Received

export interface IMarkScheduleInvoiceAsReceivedRequestAction
  extends BaseAction {
  type: typeof Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_REQUEST
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface IMarkScheduleInvoiceAsReceivedSuccessAction
  extends BaseAction {
  type: typeof Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_SUCCESS
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface IMarkScheduleInvoiceAsReceivedFailureAction
  extends BaseAction {
  type: typeof Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_FAILURE
  payload: { message: string }
}

// #endregion

// #region Mark Invoice as Non Received

export interface IMarkScheduleInvoiceAsNonReceivedRequestAction
  extends BaseAction {
  type: typeof Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_REQUEST
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface IMarkScheduleInvoiceAsNonReceivedSuccessAction
  extends BaseAction {
  type: typeof Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_SUCCESS
  payload: {
    schedule: ISchedule
    invoice: IInvoice
  }
}

export interface IMarkScheduleInvoiceAsNonReceivedFailureAction
  extends BaseAction {
  type: typeof Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_FAILURE
  payload: { message: string }
}

// #endregion

// #region Load

export interface ILoadSchedulesRequestAction extends BaseAction {
  type: typeof Types.LOAD_SCHEDULES_REQUEST
}

export interface ILoadSchedulesSuccessAction extends BaseAction {
  type: typeof Types.LOAD_SCHEDULES_SUCCESS
  payload: { schedules: ISchedule[] }
}

export interface ILoadSchedulesFailureAction extends BaseAction {
  type: typeof Types.LOAD_SCHEDULES_FAILURE
  payload: { message: string }
}

// #endregion

export type SchedulesActionTypes =
  | IApplyScheduleFiltersAction
  | IClearScheduleFiltersAction
  | IAddScheduleRequestAction
  | IAddScheduleSuccessAction
  | IAddScheduleFailureAction
  | IUpdateScheduleRequestAction
  | IUpdateScheduleSuccessAction
  | IUpdateScheduleFailureAction
  | IAddScheduleInvoiceRequestAction
  | IAddScheduleInvoiceSuccessAction
  | IAddScheduleInvoiceFailureAction
  | IUpdateScheduleInvoiceRequestAction
  | IUpdateScheduleInvoiceSuccessAction
  | IUpdateScheduleInvoiceFailureAction
  | IDeleteScheduleInvoiceRequestAction
  | IDeleteScheduleInvoiceSuccessAction
  | IDeleteScheduleInvoiceFailureAction
  | ICancelScheduleInvoiceRequestAction
  | ICancelScheduleInvoiceSuccessAction
  | ICancelScheduleInvoiceFailureAction
  | IMoveScheduleInvoiceRequestAction
  | IMoveScheduleInvoiceSuccessAction
  | IMoveScheduleInvoiceFailureAction
  | IMarkScheduleInvoiceAsReceivedRequestAction
  | IMarkScheduleInvoiceAsReceivedSuccessAction
  | IMarkScheduleInvoiceAsReceivedFailureAction
  | IMarkScheduleInvoiceAsNonReceivedRequestAction
  | IMarkScheduleInvoiceAsNonReceivedSuccessAction
  | IMarkScheduleInvoiceAsNonReceivedFailureAction
  | IRescheduleScheduleRequestAction
  | IRescheduleScheduleSuccessAction
  | IRescheduleScheduleFailureAction
  | ICloseScheduleRequestAction
  | ICloseScheduleSuccessAction
  | ICloseScheduleFailureAction
  | IDeleteScheduleRequestAction
  | IDeleteScheduleSuccessAction
  | IDeleteScheduleFailureAction
  | ICancelScheduleRequestAction
  | ICancelScheduleSuccessAction
  | ICancelScheduleFailureAction
  | ILoadSchedulesRequestAction
  | ILoadSchedulesSuccessAction
  | ILoadSchedulesFailureAction

export interface SchedulesState {
  filters?: IScheduleFilters

  schedules: ISchedule[]
  additingSchedule: boolean
  updatingSchedule: boolean
  reschedulingSchedule: boolean
  closingSchedules: boolean
  deletingSchedules: boolean
  cancelingSchedules: boolean
  loadingSchedules: boolean

  additingScheduleInvoice: boolean
  updatingScheduleInvoice: boolean
  deletingScheduleInvoice: boolean
  cancelingScheduleInvoice: boolean
  movingScheduleInvoice: boolean
  markingScheduleInvoiceAsReceived: boolean
  markingScheduleInvoiceAsNonReceived: boolean
}

export interface IScheduleFilters {
  situation?: ScheduleSituations
  shippingName?: string
  invoiceNumber?: number
  providers: IProvider[]
}

export interface IRescheduleResponse {
  schedule: ISchedule
  reschedule: ISchedule
}

export interface ICreateScheduleData {
  scheduledAt: Date | string
  priority: boolean

  freightType: Freight
  vehicleType: Vehicle
  shippingName: string
}

export type IUpdateScheduleData = Partial<ICreateScheduleData>

export interface IRescheduleScheduleData {
  scheduledAt: Date | string
}

export interface ICancelScheduleData {
  motive: string
}

export interface ICreateInvoiceData {
  providerCode: number
  number: number
  value?: number
  emittedAt?: Date
  key?: string
  weight?: number
  volume?: number
  cteNumber?: number
  cteKey?: string
  invoiceFile?: File
  cteFile?: File
  invoiceFileId?: string
  cteFileId?: string
}

export type IUpdateInvoiceData = Partial<ICreateInvoiceData>

export interface IMoveInvoiceResult {
  originSchedule: ISchedule
  destinationSchedule: ISchedule
}

export interface ISchedule {
  id: string

  situation?: ScheduleSituations
  scheduledAt: Date | string
  priority: boolean

  freightType: Freight
  vehicleType: Vehicle
  shippingName: string

  lecturer?: string
  driver?: string
  vehicleSize: Size
  chargeType?: Charge
  palletized?: boolean
  assistant?: boolean
  receiptPerInvoice?: boolean
  pipeSize?: Size
  dischargeTable: IDischargeTable

  closedAt?: Date
  receivedAt?: Date

  rescheduledAt?: Date

  totalWeight: number
  totalVolume: number

  dischargeValue?: number
  receiptValue?: number
  paymentMethod?: Receipts

  createdAt: Date
  updatedAt: Date
  canceledAt?: Date
  motive?: string

  invoices: IInvoice[]

  scheduleRequest?: IScheduleRequest

  rescheduledTo?: ISchedule
  rescheduledFrom?: ISchedule
}

export interface IDischargeTable {
  id: string

  smallPipe: number
  mediumPipe: number
  largePipe: number

  beatPalletizedWithAssistant: number
  beatPalletizedWithoutAssistant: number
  beatNonPalletizedWithAssistant: number
  beatNonPalletizedWithoutAssistant: number

  volumePalletizedWithAssistant: number
  volumePalletizedWithoutAssistant: number
  volumeNonPalletizedWithAssistant: number
  volumeNonPalletizedWithoutAssistant: number
}

export interface IInvoice {
  id: string
  providerCode: number
  number: number
  value: number
  emittedAt: Date
  receiptType?: Receipts
  key: string
  weight: number
  volume: number
  cteNumber: number
  cteKey: string
  divergence?: InvoiceDivergence
  receiptValue: number
  storedAt?: Date
  unlockedAt?: Date
  invoiceDeliveredAt?: Date
  createdAt: Date
  updatedAt: Date
  situation?: InvoiceSituations

  canceledAt?: Date

  invoiceFile: IFile
  cteFile: IFile

  provider: IProvider
}

export interface IFile {
  filename: string
  originalname: string
  url: string
  id: string
}

export interface IFileResult {
  id: string
}

export interface IInvoiceProduct {
  id: string
}

export enum InvoiceSituations {
  INVOICE_NON_LAUNCHED = 'INVOICE_NON_LAUNCHED',
  INVOICE_PRE_LAUNCHED = 'INVOICE_PRE_LAUNCHED',
  INVOICE_LAUNCHED = 'INVOICE_LAUNCHED',
  BONUS_LAUNCHED = 'BONUS_LAUNCHED',
  BONUS_FINISHED = 'BONUS_FINISHED',
  OS_GENERATED = 'OS_GENERATED',
  OS_FINISHED = 'OS_FINISHED',
  CANCELED = 'CANCELED'
}

export enum ScheduleSituations {
  OPENED = 'OPENED',
  SCHEDULED = 'SCHEDULED',
  WAITING = 'WAITING',
  RECEIVING = 'RECEIVING',
  RECEIVED = 'RECEIVED',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
  NON_RECEIVED = 'NON_RECEIVED',
  RESCHEDULED = 'RESCHEDULED'
}

export enum Divergence {
  ADDED = 'ADDED',
  RECEIVED = 'RECEIVED',
  NOT_RECEIVED = 'NOT_RECEIVED',
  RESCHEDULED = 'RESCHEDULED'
}

export enum InvoiceDivergence {
  RECEIVED = 'RECEIVED',
  NOT_RECEIVED = 'NOT_RECEIVED',
  RESCHEDULED = 'RESCHEDULED',
  ADDED = 'ADDED'
}

export type Freight = 'CIF' | 'FOB'
export type Vehicle = 'EXTERNAL' | 'INTERNAL'
export type Size = 'SMALL' | 'MEDIUM' | 'LARGE'
export type Charge = 'BEAT' | 'VOLUME' | 'PIPE'
export type Receipts = 'MONEY' | 'DEPOSIT' | 'PENDING'
