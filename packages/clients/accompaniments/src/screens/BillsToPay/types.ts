import { Dispatch, SetStateAction } from 'react'

import { BillsToPay } from '~/store/modules/billsToPay/types'

export interface SchedulesContextHandles {
  billsToPay: BillsToPay[]

  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}
