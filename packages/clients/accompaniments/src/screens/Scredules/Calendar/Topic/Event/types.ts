export interface IEvent {
  id: string
  startHour: Date
  endHour: Date
}

export interface IEventProps {
  data: IEvent
}
