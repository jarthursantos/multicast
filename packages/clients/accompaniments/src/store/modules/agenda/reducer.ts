import produce from 'immer'

import { AgendaActionTypes, AgendaState, Types } from './types'

const INITIAL_STATE: AgendaState = {
  agenda: [],

  loading: false,

  additingAgenda: false
}

export default function accompaniments(
  state = INITIAL_STATE,
  action: AgendaActionTypes
) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LOAD_AGENDA_SUCCESS: {
        draft.agenda = action.payload.agenda
        draft.loading = false

        break
      }
      case Types.LOAD_AGENDA_FAILURE: {
        draft.loading = false

        break
      }
      case Types.LOAD_AGENDA_REQUEST: {
        draft.loading = true

        break
      }

      case Types.CREATE_AGENDA_SUCCESS: {
        draft.agenda.push(action.payload.agenda)
        draft.additingAgenda = false

        break
      }
      case Types.CREATE_AGENDA_FAILURE: {
        draft.additingAgenda = false

        break
      }
      case Types.CREATE_AGENDA_REQUEST: {
        draft.additingAgenda = true

        break
      }

      default:
    }
  })
}
