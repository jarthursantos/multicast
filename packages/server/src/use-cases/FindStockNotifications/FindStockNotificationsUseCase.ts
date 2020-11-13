import {
  IStockNotificationsRepository,
  Options
} from 'repositories/IStockNotificationsRepository'

export class FindStockNotificationsUseCase {
  constructor(
    private stockNotificationsRepository: IStockNotificationsRepository
  ) {}

  async generate(options: Options) {
    const result = await this.stockNotificationsRepository.find(options)

    return result
  }
}
