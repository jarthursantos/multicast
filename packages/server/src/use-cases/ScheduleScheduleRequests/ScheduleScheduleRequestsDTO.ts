import { CreateSchedulesRequestDTO } from 'use-cases/CreateSchedules/CreateSchedulesDTO'
import { UpdateScheduleRequestsRequestDTO } from 'use-cases/UpdateScheduleRequests/UpdateScheduleRequestsDTO'

export type ScheduleScheduleRequestsRequestDTO = UpdateScheduleRequestsRequestDTO &
  Omit<CreateSchedulesRequestDTO, 'scheduledAt' | 'shippingName'>
