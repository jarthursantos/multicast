import { ISchedule } from '~/store/modules/schedules/types'

export interface IScheduleListItemProps {
  data: ISchedule
  selected?: boolean
  onClick(): void
}
