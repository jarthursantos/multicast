import { IProvider, IBuyer } from '@shared/web-components'

import { BaseAction } from '../types'

export enum Types {
  LOAD_BILLS_TO_PAY_REQUEST = '@billsToPay/LOAD_BILLS_TO_PAY_REQUEST',
  LOAD_BILLS_TO_PAY_SUCCESS = '@billsToPay/LOAD_BILLS_TO_PAY_SUCCESS',
  LOAD_BILLS_TO_PAY_FAILURE = '@billsToPay/LOAD_BILLS_TO_PAY_FAILURE'
}

export interface LoadBillsToPayRequestAction extends BaseAction {
  type: typeof Types.LOAD_BILLS_TO_PAY_REQUEST
}

export interface LoadBillsToPayFailureAction extends BaseAction {
  type: typeof Types.LOAD_BILLS_TO_PAY_FAILURE
  payload: {
    message: string
  }
}

export interface LoadBillsToPaySuccessAction extends BaseAction {
  type: typeof Types.LOAD_BILLS_TO_PAY_SUCCESS
  payload: {
    billsToPay: BillsToPay[]
  }
}

export type BillsToPayActionTypes =
  | LoadBillsToPayRequestAction
  | LoadBillsToPayFailureAction
  | LoadBillsToPaySuccessAction

export interface BillsToPayState {
  loading: boolean
  billsToPay: BillsToPay[]

  filters: IBillsToPayFilters
}

export interface BillsToPay {
  buyer: IBuyer
  provider: IProvider
  deadline: number
  dueDate: Date | string
  installment: string
  value: number
}

export interface IBillsToPayFilters {
  buyers: IBuyer[]
  providers: IProvider[]
}
