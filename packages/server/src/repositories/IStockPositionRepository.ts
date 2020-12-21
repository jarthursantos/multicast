import {
  ComparativePosition,
  GeneralStockPosition,
  MasterPosition,
  SyntheticMovePosition
} from 'entities/StockPosition'

export interface Options {
  regions: number[]
  branch?: string
  salesClass?: string
  class?: string
  stock: 'all' | 'ofDay'
  stockDay?: string | Date
  buyers?: number[]
  providers?: number[]
  principalProviders?: number[]
  products?: number[]
  departments?: number[]
  brands?: number[]
  productWebs?: number[]
  sections?: number[]
  categories?: number[]
  subcategories?: number[]
  tributations?: number[]
  observation: 'active' | 'outOfLine' | 'all'
  productGroup: '>' | '=' | '<' | '<>' | 'all'
  consider: 'all' | 'physic'
}

export interface SyntheticOptions extends Omit<Options, 'departments'> {
  departments: number[]
  periodFrom: string | Date
  periodTo: string | Date
  filter: '>' | '=' | 'all'
}

export interface ComparativeOptions extends Options {
  periodFrom: string | Date
}

export interface IStockPositionRepository {
  findGeneralStock(options: Options): Promise<GeneralStockPosition[]>
  findSyntheticMove(options: SyntheticOptions): Promise<SyntheticMovePosition[]>
  findMaster(options: Options): Promise<MasterPosition[]>
  findComparative(options: ComparativeOptions): Promise<ComparativePosition[]>
}
