import { IKeepConnectedRequestAction, Types } from './types'

export function keepConnectedRequest(
  value: boolean
): IKeepConnectedRequestAction {
  return {
    type: Types.KEEP_CONNECTED_REQUEST,
    payload: { value }
  }
}

export function resetPreferencesRequest() {
  throw Error('not implemented')
}
