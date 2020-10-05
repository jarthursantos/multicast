import { Annotation } from 'entities/Annotation'

export interface IAnnotationsRepository {
  save(annotation: Annotation): Promise<void>
  findFromAccompaniment(id: string): Promise<Annotation[]>
}
