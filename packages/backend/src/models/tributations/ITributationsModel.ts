import { ITributation } from '~/domain/ITributation'

export interface ITributationsModel {
  findById(id: number): Promise<ITributation | undefined>
  findMany(): Promise<ITributation[]>
}
