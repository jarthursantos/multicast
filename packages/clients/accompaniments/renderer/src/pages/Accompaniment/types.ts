import { Accompaniment, Annotation } from '~/store/modules/accompaniments/types'

export interface AccompanimentSuccessActionResult {
  type: string
  payload: {
    accompaniment: Accompaniment
  }
}

export interface AnnotationSuccessActionResult {
  type: string
  payload: {
    annotation: Annotation
  }
}
