import produce from 'immer'

import { AuthActionTypes, AuthState, Types } from './types'

const INITIAL_STATE: AuthState = {}

export default function auth(state = INITIAL_STATE, action: AuthActionTypes) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LOG_IN_SUCCESS: {
        draft.user = action.payload.user
        draft.token = action.payload.token
        draft.signed = true
        break
      }
      case Types.LOG_OUT: {
        draft.signed = false
        break
      }
      default:
    }
  })
}
