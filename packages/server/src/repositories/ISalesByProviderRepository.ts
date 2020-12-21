import {
  ActivityBranchSales,
  CategoryProductSales,
  CategorySales,
  ClientLitigationSales,
  ClientSales,
  ClientSalesValueSales,
  ProductProviderSales,
  ProductSalesCountSales,
  ProductSalesValueSales,
  ProviderGoalSales,
  ProviderLitigationSales,
  RCASales,
  RCASalesValueSales,
  RegionSales,
  RouteSales,
  SquareClientProductSales,
  SquareSales,
  SupervisorRCASales,
  SupervisorSales
} from 'entities/SalesByProvider'

export interface Options {
  periodFrom: Date | string
  periodTo: Date | string
  buyers?: number[]
  providers?: number[]
  departments?: number[]
  regions?: number[]
  clients?: number[]
  principalClients?: number[]
  supervisors?: number[]
  rcas?: number[]
  distribuitions?: string[]
  sections?: number[]
  squares?: number[]
  activityBranchs?: number[]
  clientWebs?: number[]
}

export interface ISalesByProviderRepository {
  findPerClient(options: Options): Promise<ClientSales[]>
  findPerActivityBranch(options: Options): Promise<ActivityBranchSales[]>
  findPerRegion(options: Options): Promise<RegionSales[]>
  findPerSquare(options: Options): Promise<SquareSales[]>
  findPerRoute(options: Options): Promise<RouteSales[]>
  findPerSupervisor(options: Options): Promise<SupervisorSales[]>
  findPerSupervisorRCA(options: Options): Promise<SupervisorRCASales[]>
  findPerRCA(options: Options): Promise<RCASales[]>
  findPerProductProvider(options: Options): Promise<ProductProviderSales[]>
  findPerCategory(options: Options): Promise<CategorySales[]>
  findPerCategoryProduct(options: Options): Promise<CategoryProductSales[]>
  findPerClientSalesValue(options: Options): Promise<ClientSalesValueSales[]>
  findPerProductSalesCount(options: Options): Promise<ProductSalesCountSales[]>
  findPerProductSalesValue(options: Options): Promise<ProductSalesValueSales[]>
  findPerSquareClientProduct(
    options: Options
  ): Promise<SquareClientProductSales[]>
  findPerClientLitigation(options: Options): Promise<ClientLitigationSales[]>
  findPerProviderGoal(options: Options): Promise<ProviderGoalSales[]>
  findPerProviderLitigation(
    options: Options
  ): Promise<ProviderLitigationSales[]>
  findPerRCASalesValue(options: Options): Promise<RCASalesValueSales[]>
}
