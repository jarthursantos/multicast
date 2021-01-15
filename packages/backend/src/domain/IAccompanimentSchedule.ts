import { ISchedule } from './ISchedule'

export type IAccompanimentSchedule = Pick<
  ISchedule,
  'shippingName' | 'scheduledAt' | 'closedAt' | 'receivedAt'
> & {
  downloadedAt?: Date | undefined
  unlockedAt?: Date | undefined
}

export function createAccompanimentSchedule(
  props: IAccompanimentSchedule
): IAccompanimentSchedule {
  return {
    scheduledAt: props.scheduledAt,
    shippingName: props.shippingName,
    closedAt: props.closedAt,
    downloadedAt: props.downloadedAt,
    receivedAt: props.receivedAt,
    unlockedAt: props.unlockedAt
  }
}
