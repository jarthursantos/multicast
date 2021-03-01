import { IAccompaniment, createAccompaniment } from './IAccompaniment'

export interface ICanceledAccompaniment extends IAccompaniment {
  canceledAt: Date
  motive: string
}

export function createCanceledAccompaniment(
  props: Omit<ICanceledAccompaniment, 'id'>,
  id?: string
): ICanceledAccompaniment {
  return {
    ...createAccompaniment(props, id),
    canceledAt: props.canceledAt,
    motive: props.motive
  }
}
