import { IPurchaseOrder } from '~/domain/IPurchaseOrder'

export interface IPurchaseOrderModel {
  findAllUnregistered(): Promise<IPurchaseOrder[]>
  findByNumber(number: number): Promise<IPurchaseOrder | undefined>
}
