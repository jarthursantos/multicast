import { Accompaniment } from 'entities/Accompaniment'
import { PurchaseOrder } from 'entities/PurchaseOrder'

export interface IAccompanimentsRepository {
  registerPurchaseOrders(purchases: PurchaseOrder[]): Promise<void>
  findMany(): Promise<Accompaniment[]>
  findById(id: string): Promise<Accompaniment>
  update(accompaniment: Accompaniment): Promise<Accompaniment>
}
