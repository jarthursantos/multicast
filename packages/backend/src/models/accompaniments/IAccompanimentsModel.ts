import { IAccompaniment } from '~/domain/IAccompaniment'
import { ICanceledAccompaniment } from '~/domain/ICanceledAccompaniment'
import { IFinishedAccompaniment } from '~/domain/IFinishedAccompaniment'
import { IPurchaseOrder } from '~/domain/IPurchaseOrder'
import { IUser } from '~/domain/IUser'

export interface Data {
  motive: string
}

export interface FindCanceledFilters {
  buyers: number[]
  providers: number[]
  numberFrom?: number
  numberTo?: number
  periodFrom?: Date
  periodTo?: Date
}

export interface IAccompanimentsModel {
  save(accompaniment: IAccompaniment): Promise<void>
  registerPurchaseOrders(purchases: IPurchaseOrder[]): Promise<void>
  findMany(): Promise<IAccompaniment[]>
  findCanceleds(
    filters?: FindCanceledFilters
  ): Promise<ICanceledAccompaniment[]>
  findFinisheds(
    filters?: FindCanceledFilters
  ): Promise<IFinishedAccompaniment[]>
  findById(id: string): Promise<IAccompaniment | undefined>
  update(accompaniment: IAccompaniment): Promise<IAccompaniment>
  cancel(accompaniment: IAccompaniment, data: Data, user: IUser): Promise<void>
}
