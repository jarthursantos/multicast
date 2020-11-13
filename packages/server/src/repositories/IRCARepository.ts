import { RCA } from 'entities/RCA'

export interface IRCARepository {
  findById(code: number): Promise<RCA | undefined>
  findMany(): Promise<RCA[]>
}
