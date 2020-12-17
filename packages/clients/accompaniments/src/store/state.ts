import { AccompanimentsState } from '~/store/modules/accompaniments/types'
import { AuthState } from '~/store/modules/auth/types'
import { PreferencesState } from '~/store/modules/preferences/types'

export interface RootState {
  accompaniments: AccompanimentsState
  auth: AuthState
  preferences: PreferencesState
}
