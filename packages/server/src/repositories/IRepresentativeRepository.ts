import { DetailedRepresentative } from 'entities/Representative'

export interface IRepresentativeRepository {
  findMany(): Promise<DetailedRepresentative[]>
}
