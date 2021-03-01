import { IAccompaniment, createAccompaniment } from './IAccompaniment'

export interface IFinishedAccompaniment extends IAccompaniment {
  finishedAt: Date
}

export function createFinishedAccompaniment(
  props: Omit<IFinishedAccompaniment, 'id'>,
  id?: string
): IFinishedAccompaniment {
  return {
    ...createAccompaniment(props, id),
    finishedAt: props.finishedAt
  }
}
