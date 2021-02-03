import { AccompanimentsState } from '~/store/modules/accompaniments/types'
import { AuthState } from '~/store/modules/auth/types'
import { PreferencesState } from '~/store/modules/preferences/types'

import { AgendaState } from './modules/agenda/types'

export interface RootState {
  accompaniments: AccompanimentsState
  agenda: AgendaState
  auth: AuthState
  preferences: PreferencesState
}
