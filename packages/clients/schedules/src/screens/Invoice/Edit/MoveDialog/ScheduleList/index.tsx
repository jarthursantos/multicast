import React from 'react'

import { ScheduleListItem } from './ScheduleItem'
import { Wrapper } from './styles'
import { IScheduleListProps } from './types'

const ScheduleList: React.VFC<IScheduleListProps> = ({
  schedules,
  selection,
  onSelectionChange
}) => {
  return (
    <Wrapper>
      {schedules.map(schedule => (
        <ScheduleListItem
          key={schedule.id}
          data={schedule}
          onClick={() => onSelectionChange(schedule)}
          selected={selection && selection.id === schedule.id}
        />
      ))}
    </Wrapper>
  )
}

export { ScheduleList }
