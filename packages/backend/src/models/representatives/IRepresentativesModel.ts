import { IDetailedRepresentative } from '~/domain/IRepresentative'

export interface IRepresentativesModel {
  findMany(): Promise<IDetailedRepresentative[]>
}
