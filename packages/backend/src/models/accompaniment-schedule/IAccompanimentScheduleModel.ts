import { IAccompanimentSchedule } from '~/domain/IAccompanimentSchedule'

export interface IAccompanimentScheduleOptions {
  invoiceNumber: number | undefined | null
  invoiceProvider: number | undefined | null
  schedulingAt: Date | undefined | null
}

export interface IAccompanimentScheduleModel {
  find(
    options: IAccompanimentScheduleOptions
  ): Promise<IAccompanimentSchedule | undefined>
}
