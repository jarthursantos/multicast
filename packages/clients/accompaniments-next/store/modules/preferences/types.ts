export enum Types {
  KEEP_CONNECTED_REQUEST = '@preferences/KEEP_CONNECTED_REQUEST'
}

export interface KeepConnectedRequestAction {
  type: typeof Types.KEEP_CONNECTED_REQUEST
  payload: {
    value: boolean
  }
}

export type PreferencesActionTypes = KeepConnectedRequestAction

export interface PreferencesState {
  keepConnected?: boolean
}
