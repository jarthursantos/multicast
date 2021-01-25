export interface ICreateAgendaDTO {
  buyer: number
  agendaFrom: Date | string
  agendaTo: Date | string
  providers: number[]
}
