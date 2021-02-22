import { IBillToPay } from '~/domain/IBillToPay'

export interface IOptions {
  buyers?: number[]
  providers?: number[]
}

export interface IBillsToPayModel {
  find(options: IOptions): Promise<IBillToPay[]>
}
