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
  findPerClient(options: Options): Promise<any[]>
  findPerActivityBranch(options: Options): Promise<any[]>
  findPerRegion(options: Options): Promise<any[]>
  findPerSquare(options: Options): Promise<any[]>
  findPerRoute(options: Options): Promise<any[]>
  findPerSupervisor(options: Options): Promise<any[]>
  findPerSupervisorRCA(options: Options): Promise<any[]>
  findPerRCA(options: Options): Promise<any[]>
  findPerProductProvider(options: Options): Promise<any[]>
  findPerCategory(options: Options): Promise<any[]>
  findPerCategoryProduct(options: Options): Promise<any[]>
  findPerClientSalesValue(options: Options): Promise<any[]>
  findPerProductSalesCount(options: Options): Promise<any[]>
  findPerProductSalesValue(options: Options): Promise<any[]>
  findPerSquareClientProduct(options: Options): Promise<any[]>
  findPerClientLitigation(options: Options): Promise<any[]>
  findPerProviderGoal(options: Options): Promise<any[]>
  findPerProviderLitigation(options: Options): Promise<any[]>
  findPerRCASalesValue(options: Options): Promise<any[]>
}
