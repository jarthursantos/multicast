import { toast } from 'react-toastify'

import { remote } from 'electron'
import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import { RootState } from '~/store/state'

import {
  searchStockNotificationsActionFailure,
  searchStockNotificationsSuccess
} from './actions'
import {
  SearchStockNotificationsRequestAction,
  SearchStockNotificationsResult,
  Types
} from './types'

function* loadStockNotifications({
  payload
}: SearchStockNotificationsRequestAction) {
  try {
    const { search } = payload
    const token: string = yield select((state: RootState) => state.auth.token)

    const response = yield call(api.get, '/stockNotifications', {
      params: search,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const {
      arrived,
      released,
      terminated
    }: SearchStockNotificationsResult = response.data

    toast.success('Notificações do estoque atualizadas')

    yield put(searchStockNotificationsSuccess(arrived, released, terminated))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox(
      'Erro ao carregar notificações do estoque',
      String(message)
    )

    yield put(searchStockNotificationsActionFailure(message))
  }
}

export default all([
  takeLatest(Types.SEARCH_STOCK_NOTIFICATIONS_REQUEST, loadStockNotifications)
])
