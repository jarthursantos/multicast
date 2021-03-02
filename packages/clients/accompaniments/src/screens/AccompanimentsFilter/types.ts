import { IAccompanimentFilters } from '~/store/modules/accompaniments/types'

export interface IAccompanimentsFilterScreenProps {
  filters: Partial<IAccompanimentFilters>
  includeCanceledAccompaniments: boolean
  includeCompletedAccompaniments: boolean
}
