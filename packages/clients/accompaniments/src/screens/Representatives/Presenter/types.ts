import { ColumnDefinition } from 'tabulator-tables'

export interface StockNotificationsPresenterProps {
  onGroupSelectionChange(group: any | undefined): void

  groupData: any[]
  groupColumns: ColumnDefinition[]
  representativesData: any[]
  representativesColumns: ColumnDefinition[]
}
