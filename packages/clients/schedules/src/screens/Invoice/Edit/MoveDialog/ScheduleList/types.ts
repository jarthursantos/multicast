import { Dispatch, SetStateAction } from 'react'

import { ISchedule } from '~/store/modules/schedules/types'

export interface IScheduleListProps {
  schedules: ISchedule[]
  selection: ISchedule | undefined
  onSelectionChange: Dispatch<SetStateAction<ISchedule | undefined>>
}
