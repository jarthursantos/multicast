import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useSetToken } from '@shared/axios'

import { setAuthToken } from '~/store/modules/auth/actions'

export function useSetupAuth(token: string) {
  const dispatch = useDispatch()
  const setAxiosToken = useSetToken()

  useEffect(() => {
    setAxiosToken(token)
    dispatch(setAuthToken(token))
  }, [setAxiosToken, dispatch, token])
}
