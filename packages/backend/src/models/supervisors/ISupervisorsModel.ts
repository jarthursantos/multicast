import { ISupervisor } from '~/domain/ISupervisor'

export interface ISupervisorsModel {
  findById(id: number): Promise<ISupervisor | undefined>
  findMany(): Promise<ISupervisor[]>
}
