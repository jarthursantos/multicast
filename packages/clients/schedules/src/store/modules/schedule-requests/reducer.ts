import { toast } from 'react-toastify'

import { remote } from 'electron'
import produce from 'immer'

import { SchedulesActionTypes, ScheduleRequestsState, Types } from './types'

const INITIAL_STATE: ScheduleRequestsState = {
  scheduleRequests: [],

  additingScheduleRequest: false,
  updatingScheduleRequest: false,
  removingScheduleRequest: false,
  loadingScheduleRequest: false
}

export default function schedules(
  state = INITIAL_STATE,
  action: SchedulesActionTypes
) {
  return produce(state, draft => {
    switch (action.type) {
      // #region Add
      case Types.ADD_SCHEDULE_REQUESTS_SUCCESS: {
        draft.scheduleRequests.push(action.payload.scheduleRequest)
        draft.additingScheduleRequest = false

        toast.success('Pré Agendamento adicionado')

        break
      }
      case Types.ADD_SCHEDULE_REQUESTS_REQUEST: {
        draft.additingScheduleRequest = true

        break
      }
      case Types.ADD_SCHEDULE_REQUESTS_FAILURE: {
        draft.additingScheduleRequest = false

        remote.dialog.showErrorBox(
          'Error ao adicionar pré agendamento',
          action.payload.message
        )

        break
      }
      // #endregion

      // #region Update
      case Types.UPDATE_SCHEDULE_REQUESTS_SUCCESS: {
        draft.scheduleRequests = draft.scheduleRequests.filter(({ id }) => {
          return id !== action.payload.scheduleRequest.id
        })

        draft.scheduleRequests.push(action.payload.updatedScheduleRequest)
        draft.updatingScheduleRequest = false

        toast.success('Pré Agendamento atualizado')

        break
      }
      case Types.UPDATE_SCHEDULE_REQUESTS_REQUEST: {
        draft.updatingScheduleRequest = true

        break
      }
      case Types.UPDATE_SCHEDULE_REQUESTS_FAILURE: {
        draft.updatingScheduleRequest = false

        remote.dialog.showErrorBox(
          'Error ao atualizar pré agendamento',
          action.payload.message
        )

        break
      }
      // #endregion

      // #region Remove
      case Types.REMOVE_SCHEDULE_REQUESTS_SUCCESS: {
        draft.scheduleRequests = draft.scheduleRequests.filter(({ id }) => {
          return id !== action.payload.scheduleRequest.id
        })

        draft.removingScheduleRequest = false

        toast.success('Pré Agendamento removido')

        break
      }
      case Types.REMOVE_SCHEDULE_REQUESTS_REQUEST: {
        draft.removingScheduleRequest = true

        break
      }
      case Types.REMOVE_SCHEDULE_REQUESTS_FAILURE: {
        draft.removingScheduleRequest = false

        remote.dialog.showErrorBox(
          'Error ao remover pré agendamento',
          action.payload.message
        )

        break
      }
      // #endregion

      // #region Load

      case Types.LOAD_SCHEDULE_REQUESTS_SUCCESS: {
        draft.scheduleRequests = action.payload.scheduleRequests
        draft.loadingScheduleRequest = false

        toast.success('Pré Agendamentos carregados')

        break
      }
      case Types.LOAD_SCHEDULE_REQUESTS_REQUEST: {
        draft.loadingScheduleRequest = true

        break
      }
      case Types.LOAD_SCHEDULE_REQUESTS_FAILURE: {
        draft.loadingScheduleRequest = false

        remote.dialog.showErrorBox(
          'Error ao carregar pré agendamentos',
          action.payload.message
        )

        break
      }
      // #endregion

      default:
    }
  })
}
