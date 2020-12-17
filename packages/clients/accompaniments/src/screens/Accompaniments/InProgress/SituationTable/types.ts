import { ColumnDefinition } from 'tabulator-tables'

import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { Accompaniment } from '~/store/modules/accompaniments/types'

export interface InProgressSituationTableProps {
  data: Accompaniment[]
  columns: ColumnDefinition[]
  tab: InProgressTabs
  onSelectionChange(accompaniment?: Accompaniment): void
}
