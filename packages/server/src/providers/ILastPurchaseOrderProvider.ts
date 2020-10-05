export interface ILastPurchaseOrderProvider {
  find(): Promise<number>
}
