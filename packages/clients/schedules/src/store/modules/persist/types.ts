import { RootState } from '../../state'

export enum Types {
  REHYDRATE = 'persist/REHYDRATE'
}

export interface IReHydrateSuccessAction {
  type: typeof Types.REHYDRATE
  payload: RootState
}
