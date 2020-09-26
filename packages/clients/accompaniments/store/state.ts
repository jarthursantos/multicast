import { AuthState } from './modules/auth/types'
import { PreferencesState } from './modules/preferences/types'

export interface RootState {
  auth: AuthState
  preferences: PreferencesState
}
