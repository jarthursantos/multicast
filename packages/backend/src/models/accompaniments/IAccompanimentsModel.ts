import { IAccompaniment } from '~/domain/IAccompaniment'
import { ICanceledAccompaniment } from '~/domain/ICanceledAccompaniment'
import { IFinishedAccompaniment } from '~/domain/IFinishedAccompaniment'
import { IPurchaseOrder } from '~/domain/IPurchaseOrder'
import { IUser } from '~/domain/IUser'

export interface Data {
  motive: string
}

export interface IAccompanimentsModel {
  save(accompaniment: IAccompaniment): Promise<void>
  registerPurchaseOrders(purchases: IPurchaseOrder[]): Promise<void>
  findMany(): Promise<IAccompaniment[]>
  findCanceleds(): Promise<ICanceledAccompaniment[]>
  findFinisheds(): Promise<IFinishedAccompaniment[]>
  findById(id: string): Promise<IAccompaniment | undefined>
  update(accompaniment: IAccompaniment): Promise<IAccompaniment>
  cancel(accompaniment: IAccompaniment, data: Data, user: IUser): Promise<void>
}
