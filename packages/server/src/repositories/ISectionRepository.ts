import { Section } from 'entities/Section'

export interface ISectionRepository {
  findById(id: number): Promise<Section | undefined>
  findMany(): Promise<Section[]>
}
