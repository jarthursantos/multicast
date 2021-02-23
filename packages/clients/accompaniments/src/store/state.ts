import { AccompanimentsState } from '~/store/modules/accompaniments/types'
import { AgendaState } from '~/store/modules/agenda/types'
import { AuthState } from '~/store/modules/auth/types'
import { BillsToPayState } from '~/store/modules/billsToPay/types'
import { PreferencesState } from '~/store/modules/preferences/types'

export interface RootState {
  accompaniments: AccompanimentsState
  agenda: AgendaState
  auth: AuthState
  billsToPay: BillsToPayState
  preferences: PreferencesState
}
