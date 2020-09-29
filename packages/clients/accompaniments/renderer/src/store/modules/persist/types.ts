import { RootState } from '../../state'

export enum Types {
  REHYDRATE = 'persist/REHYDRATE'
}

export interface ReHydrateSuccessAction {
  type: typeof Types.REHYDRATE
  payload: RootState
}
