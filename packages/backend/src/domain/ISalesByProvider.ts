import { IActivityBranch } from './IActivityBranch'
import { IBuyer } from './IBuyer'
import { ICategory } from './ICategory'
import { IBaseClient } from './IClient'
import { IBaseProduct, IBasicProduct } from './IProduct'
import { IProvider } from './IProvider'
import { IRCA } from './IRCA'
import { IRegion } from './IRegion'
import { IRoute } from './IRoute'
import { ISquare } from './ISquare'
import { ISupervisor } from './ISupervisor'

export interface IClientSales {
  count: number
  salesValue: number
  tableValue: number
  amountWeight: number
  mixCount: number
  client: IBaseClient
  provider: IProvider
}

export interface IActivityBranchSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  branch: IActivityBranch
  provider: IProvider
}

export interface IRegionSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  region: IRegion
  provider: IProvider
}

export interface ISquareSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  square: ISquare
  provider: IProvider
}

export interface IRouteSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  route: IRoute
  provider: IProvider
}

export interface ISupervisorSales {
  count: number
  salesValue: number
  amountWeight: number
  tableValue: number
  mixCount: number
  positivedClientCount: number
  supervisor: ISupervisor
  provider: IProvider
}

export interface ISupervisorRCASales {
  count: number
  salesValue: number
  amountWeight: number
  tableValue: number
  mixCount: number
  positivedClientCount: number
  supervisor: ISupervisor
  rca: IRCA
  provider: IProvider
}

export interface IRCASales {
  count: number
  salesValue: number
  tableValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  rca: IRCA
  provider: IProvider
}

export interface IProductProviderSales {
  count: number
  salesValue: number
  tableValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  product: IBaseProduct
  provider: IProvider
}

export interface ICategorySales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  category: ICategory
  provider: IProvider
}

export interface ICategoryProductSales {
  count: number
  salesValue: number
  amountWeight: number
  mixCount: number
  positivedClientCount: number
  category: ICategory
  product: IBasicProduct
  provider: IProvider
}

export interface IClientSalesValueSales {
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
  client: IBaseClient
  provider: IProvider
}

export interface IProductSalesCountSales {
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
  product: IBasicProduct
  provider: IProvider
}

export type IProductSalesValueSales = IProductSalesCountSales

export interface ISquareClientProductSales {
  provider: IProvider
  square: ISquare
  client: IBaseClient
  product: IBasicProduct
  count: number
  salesValue: number
}

export interface IClientLitigationSales {
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
  client: IBaseClient
  provider: IProvider
}

export interface IProviderGoalSales {
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
  buyer: IBuyer
  provider: IProvider
}

export interface IProviderLitigationSales {
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
  provider: IProvider
}

export interface IRCASalesValueSales {
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
  rca: IRCA
  provider: IProvider
}
