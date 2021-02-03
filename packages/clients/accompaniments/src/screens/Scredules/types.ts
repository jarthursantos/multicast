import { Dispatch, SetStateAction } from 'react'

import { Agenda } from '~/store/modules/agenda/types'

export interface SchedulesContextHandles {
  agenda: Agenda[]

  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}
