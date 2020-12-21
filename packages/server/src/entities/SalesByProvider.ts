import { ActivityBranch } from './ActivityBranch'
import { Buyer } from './Buyer'
import { Category } from './Category'
import { BaseClient } from './Clients'
import { BaseProduct, BasicProduct } from './Product'
import { Provider } from './Provider'
import { RCA } from './RCA'
import { Region } from './Region'
import { Route } from './Route'
import { Square } from './Square'
import { Supervisor } from './Supervisor'

export interface ClientSales {
  count: number
  salesValue: number
  tableValue: number
  amountWeight: number
  mixCount: number
  client: BaseClient
  provider: Provider
}

export interface ActivityBranchSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  branch: ActivityBranch
  provider: Provider
}

export interface RegionSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  region: Region
  provider: Provider
}

export interface SquareSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  square: Square
  provider: Provider
}

export interface RouteSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  route: Route
  provider: Provider
}

export interface SupervisorSales {
  count: number
  salesValue: number
  amountWeight: number
  tableValue: number
  mixCount: number
  positivedClientCount: number
  supervisor: Supervisor
  provider: Provider
}

export interface SupervisorRCASales {
  count: number
  salesValue: number
  amountWeight: number
  tableValue: number
  mixCount: number
  positivedClientCount: number
  supervisor: Supervisor
  rca: RCA
  provider: Provider
}

export interface RCASales {
  count: number
  salesValue: number
  tableValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  rca: RCA
  provider: Provider
}

export interface ProductProviderSales {
  count: number
  salesValue: number
  tableValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  product: BaseProduct
  provider: Provider
}

export interface CategorySales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  category: Category
  provider: Provider
}

export interface CategoryProductSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  category: Category
  product: BasicProduct
  provider: Provider
}

export interface ClientSalesValueSales {
  januaryValue: number
  februaryValue: number
  marchValue: number
  aprilValue: number
  mayValue: number
  juneValue: number
  julyValue: number
  augustValue: number
  septemberValue: number
  octoberValue: number
  novemberValue: number
  decemberValue: number
  client: BaseClient
  provider: Provider
}

export interface ProductSalesCountSales {
  januaryValue: number
  februaryValue: number
  marchValue: number
  aprilValue: number
  mayValue: number
  juneValue: number
  julyValue: number
  augustValue: number
  septemberValue: number
  octoberValue: number
  novemberValue: number
  decemberValue: number
  product: BasicProduct
  provider: Provider
}

export type ProductSalesValueSales = ProductSalesCountSales

export interface SquareClientProductSales {
  provider: Provider
  square: Square
  client: BaseClient
  product: BasicProduct
  count: number
  salesValue: number
}

export interface ClientLitigationSales {
  januaryValue: number
  februaryValue: number
  marchValue: number
  aprilValue: number
  mayValue: number
  juneValue: number
  julyValue: number
  augustValue: number
  septemberValue: number
  octoberValue: number
  novemberValue: number
  decemberValue: number
  client: BaseClient
  provider: Provider
}

export interface ProviderGoalSales {
  januaryValue: number
  februaryValue: number
  marchValue: number
  aprilValue: number
  mayValue: number
  juneValue: number
  julyValue: number
  augustValue: number
  septemberValue: number
  octoberValue: number
  novemberValue: number
  decemberValue: number
  amountValue: number
  januaryGoal: number
  februaryGoal: number
  marchGoal: number
  aprilGoal: number
  mayGoal: number
  juneGoal: number
  julyGoal: number
  augustGoal: number
  septemberGoal: number
  octoberGoal: number
  novemberGoal: number
  decemberGoal: number
  amountGoal: number
  buyer: Buyer
  provider: Provider
}

export interface ProviderLitigationSales {
  januaryValue: number
  februaryValue: number
  marchValue: number
  aprilValue: number
  mayValue: number
  juneValue: number
  julyValue: number
  augustValue: number
  septemberValue: number
  octoberValue: number
  novemberValue: number
  decemberValue: number
  provider: Provider
}

export interface RCASalesValueSales {
  januaryValue: number
  februaryValue: number
  marchValue: number
  aprilValue: number
  mayValue: number
  juneValue: number
  julyValue: number
  augustValue: number
  septemberValue: number
  octoberValue: number
  novemberValue: number
  decemberValue: number
  rca: RCA
  provider: Provider
}
