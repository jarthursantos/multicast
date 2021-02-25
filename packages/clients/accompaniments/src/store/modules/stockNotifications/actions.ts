import {
  ArrivedProduct,
  ReleasedProduct,
  TerminatedProduct,
  IStockNotificationsSearch,
  Types,
  SearchStockNotificationsFailureAction,
  SearchStockNotificationsRequestAction,
  SearchStockNotificationsSuccessAction
} from './types'

export function searchStockNotificationsRequest(
  search: IStockNotificationsSearch
): SearchStockNotificationsRequestAction {
  return {
    type: Types.SEARCH_STOCK_NOTIFICATIONS_REQUEST,
    payload: { search }
  }
}

export function searchStockNotificationsActionFailure(
  message: string
): SearchStockNotificationsFailureAction {
  return {
    propagate: true,
    type: Types.SEARCH_STOCK_NOTIFICATIONS_FAILURE,
    payload: { message }
  }
}

export function searchStockNotificationsSuccess(
  arrived: ArrivedProduct[],
  released: ReleasedProduct[],
  terminated: TerminatedProduct[]
): SearchStockNotificationsSuccessAction {
  return {
    propagate: true,
    type: Types.SEARCH_STOCK_NOTIFICATIONS_SUCCESS,
    payload: { arrived, released, terminated }
  }
}
