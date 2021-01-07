import { ColumnDefinition } from 'tabulator-tables'

import { Accompaniment } from '~/store/modules/accompaniments/types'

import { InReceivementTabs } from '../types'

export interface ReceivementSituationTableProps {
  data: Accompaniment[]
  columns: ColumnDefinition[]
  tab: InReceivementTabs
  onSelectionChange(accompaniment?: Accompaniment): void
}
