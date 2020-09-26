import produce from 'immer'

import { PreferencesActionTypes, PreferencesState, Types } from './types'

const INITIAL_STATE: PreferencesState = {}

export default function auth(
  state = INITIAL_STATE,
  action: PreferencesActionTypes
) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.KEEP_CONNECTED_REQUEST: {
        draft.keepConnected = action.payload.value
        break
      }
      default:
    }
  })
}
