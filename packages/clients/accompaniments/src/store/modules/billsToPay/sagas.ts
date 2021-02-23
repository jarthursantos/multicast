import { toast } from 'react-toastify'

import { remote } from 'electron'
import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { api, extractErrorMessage } from '@shared/axios'

import { RootState } from '~/store/state'

import {
  loadBillsToPayActionFailure,
  loadBillsToPayActionSuccess
} from './actions'
import { BillsToPay, Types } from './types'

export function* loadBillsToPay() {
  try {
    const token: string = yield select((state: RootState) => state.auth.token)

    const response = yield call(api.get, '/billsToPay', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const billsToPay: BillsToPay[] = response.data

    toast.success('Contas a pagar atualizadas')

    yield put(loadBillsToPayActionSuccess(billsToPay))
  } catch (err) {
    const message = extractErrorMessage(err)

    remote?.dialog.showErrorBox(
      'Erro ao carregar contas a pagar',
      String(message)
    )

    yield put(loadBillsToPayActionFailure(message))
  }
}

export default all([
  takeLatest(Types.LOAD_BILLS_TO_PAY_REQUEST, loadBillsToPay)
])
