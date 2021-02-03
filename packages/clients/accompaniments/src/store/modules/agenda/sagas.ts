import { toast } from 'react-toastify'

import { remote } from 'electron'
import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import { RootState } from '~/store/state'

import {
  createAgendaFailure,
  createAgendaSuccess,
  loadAgendaFailure,
  loadAgendaSuccess
} from './actions'
import { Agenda, CreateAgendaRequestAction, Types } from './types'

export function* loadAgenda() {
  try {
    const token: string = yield select((state: RootState) => state.auth.token)

    const response = yield call(api.get, '/agenda', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const agenda: Agenda[] = response.data

    toast.success('Agenda atualizada')

    yield put(loadAgendaSuccess(agenda))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox('Erro ao carregar agenda', String(message))

    yield put(loadAgendaFailure(message))
  }
}

export function* createAgenda({ payload }: CreateAgendaRequestAction) {
  try {
    const { data } = payload

    const response = yield call(api.post, '/agenda', data)

    const agenda: Agenda = response.data

    toast.success('Agendamento criado')

    yield put(createAgendaSuccess(agenda))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox('Erro ao criar agendamento', String(message))

    yield put(createAgendaFailure(message))
  }
}

export default all([
  takeLatest(Types.LOAD_AGENDA_REQUEST, loadAgenda),

  takeLatest(Types.CREATE_AGENDA_REQUEST, createAgenda)
])
