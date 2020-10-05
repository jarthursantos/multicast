import { AccompanimentsState } from './modules/accompaniments/types'
import { AuthState } from './modules/auth/types'
import { PreferencesState } from './modules/preferences/types'

export interface RootState {
  accompaniments: AccompanimentsState
  auth: AuthState
  preferences: PreferencesState
}
