import produce from 'immer'

import { BillsToPayState, BillsToPayActionTypes, Types } from './types'

const INITIAL_STATE: BillsToPayState = {
  billsToPay: [],

  loading: false
}

export default function accompaniments(
  state = INITIAL_STATE,
  action: BillsToPayActionTypes
) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LOAD_BILLS_TO_PAY_SUCCESS: {
        draft.billsToPay = action.payload.billsToPay
        draft.loading = false

        break
      }
      case Types.LOAD_BILLS_TO_PAY_FAILURE: {
        draft.loading = false

        break
      }
      case Types.LOAD_BILLS_TO_PAY_REQUEST: {
        draft.loading = true

        break
      }

      default:
    }
  })
}
