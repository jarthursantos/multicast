import { Accompaniment } from 'entities/Accompaniment'
import { PurchaseOrder } from 'entities/PurchaseOrder'

export interface IAccompanimentsRepository {
  save(accompaniment: Accompaniment): Promise<void>
  registerPurchaseOrders(purchases: PurchaseOrder[]): Promise<void>
  findMany(): Promise<Accompaniment[]>
  findById(id: string): Promise<Accompaniment>
  update(accompaniment: Accompaniment): Promise<Accompaniment>
}
