import { AuthState } from '~/store/modules/auth/types'
import { PreferencesState } from '~/store/modules/preferences/types'
import { ScheduleRequestsState } from '~/store/modules/schedule-requests/types'
import { SchedulesState } from '~/store/modules/schedules/types'

export interface RootState {
  auth: AuthState
  preferences: PreferencesState
  schedules: SchedulesState
  scheduleRequests: ScheduleRequestsState
}
