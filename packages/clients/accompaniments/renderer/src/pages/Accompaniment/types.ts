import { Accompaniment } from '~/store/modules/accompaniments/types'

export interface SuccessActionResult {
  type: string
  payload: {
    accompaniment: Accompaniment
  }
}
