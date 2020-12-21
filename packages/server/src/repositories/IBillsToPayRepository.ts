import { BillToPay } from 'entities/BillToPay'

export interface Options {
  buyers?: number[]
  providers?: number[]
}

export interface IBillsToPayRepository {
  find(options: Options, month: number, year: number): Promise<BillToPay[]>
}
