import { KeepConnectedRequestAction, Types } from './types'

export function keepConnectedRequest(
  value: boolean
): KeepConnectedRequestAction {
  return {
    type: Types.KEEP_CONNECTED_REQUEST,
    payload: { value }
  }
}

export function resetPreferencesRequest() {
  throw Error('not implemented')
}
