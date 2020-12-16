import { IAnnotation } from '~/domain/IAnnotation'

export interface IAnnotationsModel {
  save(annotation: IAnnotation): Promise<void>
  findFromAccompaniment(id: string): Promise<IAnnotation[]>
}
