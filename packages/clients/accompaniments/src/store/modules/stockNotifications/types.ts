import { IProvider, IBuyer } from '@shared/web-components'

import { BaseAction } from '../types'

export enum Types {
  SEARCH_STOCK_NOTIFICATIONS_REQUEST = '@stockNotifications/SEARCH_STOCK_NOTIFICATIONS_REQUEST',
  SEARCH_STOCK_NOTIFICATIONS_SUCCESS = '@stockNotifications/SEARCH_STOCK_NOTIFICATIONS_SUCCESS',
  SEARCH_STOCK_NOTIFICATIONS_FAILURE = '@stockNotifications/SEARCH_STOCK_NOTIFICATIONS_FAILURE'
}

export interface SearchStockNotificationsRequestAction extends BaseAction {
  type: typeof Types.SEARCH_STOCK_NOTIFICATIONS_REQUEST
  payload: {
    search: IStockNotificationsSearch
  }
}

export interface SearchStockNotificationsFailureAction extends BaseAction {
  type: typeof Types.SEARCH_STOCK_NOTIFICATIONS_FAILURE
  payload: {
    message: string
  }
}

export interface SearchStockNotificationsSuccessAction extends BaseAction {
  type: typeof Types.SEARCH_STOCK_NOTIFICATIONS_SUCCESS
  payload: {
    arrived: ArrivedProduct[]
    released: ReleasedProduct[]
    terminated: TerminatedProduct[]
  }
}

export type StockNotificationsActionTypes =
  | SearchStockNotificationsRequestAction
  | SearchStockNotificationsFailureAction
  | SearchStockNotificationsSuccessAction

export interface StockNotificationsState {
  searching: boolean

  arrived: ArrivedProduct[]
  released: ReleasedProduct[]
  terminated: TerminatedProduct[]
}

export interface IStockNotificationsSearch {
  periodFrom: Date
  periodTo: Date
  buyers: IBuyer[]
  providers: IProvider[]
}

export interface StockProduct {
  invoiceNumber: number
  code: number
  description: string
  factoryCode: string
  lastBuyPrice: number
  lastEntryQuantity: number
  lastPurchaseOrderAt: Date | string
  packing: string
  unity: string
  provider: IProvider
}

export interface ArrivedProduct extends StockProduct {
  arrivedAt: Date | string
}

export interface ReleasedProduct extends StockProduct {
  releasedAt: Date | string
}

export interface TerminatedProduct extends StockProduct {
  terminationAt: Date | string
}

export interface SearchStockNotificationsResult {
  arrived: ArrivedProduct[]
  released: ReleasedProduct[]
  terminated: TerminatedProduct[]
}
