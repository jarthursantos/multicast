import {
  SupervisorRevenues,
  MonthRevenues,
  DeadlineRevenues,
  EvolutionRevenues,
  ClassRevenues,
  RegionRevenues,
  EmitterRevenues,
  AnaliticRevenues,
  ChargeRevenues,
  CheckOutRevenues,
  SalesOriginRevenues,
  ActuationAreaRevenues,
  ProviderRevenues
} from 'entities/Revenues'

export interface Options {
  periodFrom: Date | string
  periodTo: Date | string
  situation: 'all' | 'billed' | 'nonBilled'
  clients: 'all' | 'pj' | 'pf'
}

export interface IRevenuesRepository {
  findBySupervisor(options: Options): Promise<SupervisorRevenues[]>

  findByMonth(options: Options): Promise<MonthRevenues[]>

  findByDeadline(options: Options): Promise<DeadlineRevenues[]>

  findByEvolution(options: Options): Promise<EvolutionRevenues[]>

  findByClass(options: Options): Promise<ClassRevenues[]>
  findByClassOrigin(options: Options): Promise<ClassRevenues[]>
  findByClassPosition(options: Options): Promise<ClassRevenues[]>
  findByClassSellType(options: Options): Promise<ClassRevenues[]>

  findByRegion(options: Options): Promise<RegionRevenues[]>

  findByEmitter(options: Options): Promise<EmitterRevenues[]>

  findByAnalitic(options: Options): Promise<AnaliticRevenues[]>

  findByCharge(options: Options): Promise<ChargeRevenues[]>

  findByCheckOut(options: Options): Promise<CheckOutRevenues[]>

  findBySalesOrigin(options: Options): Promise<SalesOriginRevenues[]>
  findBySalesOriginEmitter(
    origin: string,
    options: Options
  ): Promise<SalesOriginRevenues[]>
  findBySalesOriginSupervisor(
    origin: string,
    options: Options
  ): Promise<SalesOriginRevenues[]>

  findByActuationArea(options: Options): Promise<ActuationAreaRevenues[]>

  findByProvider(options: Options): Promise<ProviderRevenues[]>
}
