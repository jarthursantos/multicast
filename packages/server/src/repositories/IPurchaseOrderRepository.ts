import { PurchaseOrder } from 'entities/PurchaseOrder'

export interface IPurchaseOrderRepository {
  findAllUnregistered(): Promise<PurchaseOrder[]>
  findByNumber(number: number): Promise<PurchaseOrder>
}
