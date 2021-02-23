import {
  BillsToPay,
  Types,
  LoadBillsToPayFailureAction,
  LoadBillsToPayRequestAction,
  LoadBillsToPaySuccessAction
} from './types'

export function loadBillsToPayActionRequest(): LoadBillsToPayRequestAction {
  return {
    type: Types.LOAD_BILLS_TO_PAY_REQUEST
  }
}

export function loadBillsToPayActionFailure(
  message: string
): LoadBillsToPayFailureAction {
  return {
    propagate: true,
    type: Types.LOAD_BILLS_TO_PAY_FAILURE,
    payload: { message }
  }
}

export function loadBillsToPayActionSuccess(
  billsToPay: BillsToPay[]
): LoadBillsToPaySuccessAction {
  return {
    propagate: true,
    type: Types.LOAD_BILLS_TO_PAY_SUCCESS,
    payload: { billsToPay }
  }
}
