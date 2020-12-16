import {
  IActuationAreaRevenues,
  IAnaliticRevenues,
  IChargeRevenues,
  ICheckOutRevenues,
  IClassRevenues,
  IDeadlineRevenues,
  IEmitterRevenues,
  IEvolutionRevenues,
  IMonthRevenues,
  IProviderRevenues,
  IRegionRevenues,
  ISalesOriginRevenues,
  ISupervisorRevenues
} from '~/domain/IRevenues'

export interface IOptions {
  periodFrom: Date | string
  periodTo: Date | string
  situation: 'all' | 'billed' | 'nonBilled'
  clients: 'all' | 'pj' | 'pf'
}

export interface IRevenuesModel {
  findBySupervisor(options: IOptions): Promise<ISupervisorRevenues[]>

  findByMonth(options: IOptions): Promise<IMonthRevenues[]>

  findByDeadline(options: IOptions): Promise<IDeadlineRevenues[]>

  findByEvolution(options: IOptions): Promise<IEvolutionRevenues[]>

  findByClass(options: IOptions): Promise<IClassRevenues[]>
  findByClassOrigin(options: IOptions): Promise<IClassRevenues[]>
  findByClassPosition(options: IOptions): Promise<IClassRevenues[]>
  findByClassSellType(options: IOptions): Promise<IClassRevenues[]>

  findByRegion(options: IOptions): Promise<IRegionRevenues[]>

  findByEmitter(options: IOptions): Promise<IEmitterRevenues[]>

  findByAnalitic(options: IOptions): Promise<IAnaliticRevenues[]>

  findByCharge(options: IOptions): Promise<IChargeRevenues[]>

  findByCheckOut(options: IOptions): Promise<ICheckOutRevenues[]>

  findBySalesOrigin(options: IOptions): Promise<ISalesOriginRevenues[]>
  findBySalesOriginEmitter(
    origin: string,
    options: IOptions
  ): Promise<ISalesOriginRevenues[]>
  findBySalesOriginSupervisor(
    origin: string,
    options: IOptions
  ): Promise<ISalesOriginRevenues[]>

  findByActuationArea(options: IOptions): Promise<IActuationAreaRevenues[]>

  findByProvider(options: IOptions): Promise<IProviderRevenues[]>
}
