import { ColumnDefinition } from 'tabulator-tables'

import { IProvider } from '@shared/web-components'

import { StockProduct } from '~/store/modules/stockNotifications/types'

export interface StockNotificationsPresenterProps {
  productsColumns: ColumnDefinition[]
  providers: IProvider[]
  products: StockProduct[]
  onChangeSelection(provider?: IProvider): void
}
