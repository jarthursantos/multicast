export interface IEvent {
  id: string
  startHour: Date
  endHour: Date
  labels: string[]
}

export interface IEventProps {
  data: IEvent
}
