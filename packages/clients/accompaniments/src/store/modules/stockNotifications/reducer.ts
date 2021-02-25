import produce from 'immer'

import {
  StockNotificationsState,
  StockNotificationsActionTypes,
  Types
} from './types'

const INITIAL_STATE: StockNotificationsState = {
  arrived: [],
  released: [],
  terminated: [],

  searching: false
}

export default function accompaniments(
  state = INITIAL_STATE,
  action: StockNotificationsActionTypes
) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SEARCH_STOCK_NOTIFICATIONS_SUCCESS: {
        draft.arrived = action.payload.arrived
        draft.released = action.payload.released
        draft.terminated = action.payload.terminated

        draft.searching = false

        break
      }
      case Types.SEARCH_STOCK_NOTIFICATIONS_FAILURE: {
        draft.searching = false

        break
      }
      case Types.SEARCH_STOCK_NOTIFICATIONS_REQUEST: {
        draft.searching = true

        break
      }

      default:
    }
  })
}
