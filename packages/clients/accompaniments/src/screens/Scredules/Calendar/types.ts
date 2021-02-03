import { IBuyer } from '@shared/web-components'

import { Agenda } from '~/store/modules/agenda/types'

export interface BuyerTopic {
  buyer: IBuyer
  events: Omit<Agenda, 'buyer'>[]
}
