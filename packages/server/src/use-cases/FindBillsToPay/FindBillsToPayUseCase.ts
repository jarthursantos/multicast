import { IBillsToPayRepository } from 'repositories/IBillsToPayRepository'

import { IFindBillsToPayDTO } from './FindBillstoPayParser'

export class FindBillsToPayUseCase {
  constructor(private billsToPayRepository: IBillsToPayRepository) {}

  async execute(options: IFindBillsToPayDTO, month: number, year: number) {
    const bills = await this.billsToPayRepository.find(options, month, year)

    return bills
  }
}
