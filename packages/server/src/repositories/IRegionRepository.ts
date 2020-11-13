import { Region } from 'entities/Region'

export interface IRegionRepository {
  findById(id: number): Promise<Region | undefined>
  findMany(): Promise<Region[]>
}
