import {
  IClientSales,
  IActivityBranchSales,
  ICategoryProductSales,
  ICategorySales,
  IClientLitigationSales,
  IClientSalesValueSales,
  IProductProviderSales,
  IProductSalesCountSales,
  IProviderGoalSales,
  IProviderLitigationSales,
  IRCASales,
  IRCASalesValueSales,
  IRegionSales,
  IRouteSales,
  ISquareClientProductSales,
  ISquareSales,
  ISupervisorRCASales,
  ISupervisorSales,
  IProductSalesValueSales
} from '~/domain/ISalesByProvider'

export interface IOptions {
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

export interface ISalesByProviderModel {
  findPerClient(options: IOptions): Promise<IClientSales[]>
  findPerActivityBranch(options: IOptions): Promise<IActivityBranchSales[]>
  findPerRegion(options: IOptions): Promise<IRegionSales[]>
  findPerSquare(options: IOptions): Promise<ISquareSales[]>
  findPerRoute(options: IOptions): Promise<IRouteSales[]>
  findPerSupervisor(options: IOptions): Promise<ISupervisorSales[]>
  findPerSupervisorRCA(options: IOptions): Promise<ISupervisorRCASales[]>
  findPerRCA(options: IOptions): Promise<IRCASales[]>
  findPerProductProvider(options: IOptions): Promise<IProductProviderSales[]>
  findPerCategory(options: IOptions): Promise<ICategorySales[]>
  findPerCategoryProduct(options: IOptions): Promise<ICategoryProductSales[]>
  findPerClientSalesValue(options: IOptions): Promise<IClientSalesValueSales[]>
  findPerProductSalesCount(
    options: IOptions
  ): Promise<IProductSalesCountSales[]>
  findPerProductSalesValue(
    options: IOptions
  ): Promise<IProductSalesValueSales[]>
  findPerSquareClientProduct(
    options: IOptions
  ): Promise<ISquareClientProductSales[]>
  findPerClientLitigation(options: IOptions): Promise<IClientLitigationSales[]>
  findPerProviderGoal(options: IOptions): Promise<IProviderGoalSales[]>
  findPerProviderLitigation(
    options: IOptions
  ): Promise<IProviderLitigationSales[]>
  findPerRCASalesValue(options: IOptions): Promise<IRCASalesValueSales[]>
}
