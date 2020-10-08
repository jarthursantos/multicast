import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import { useAxios, useSetToken } from '@shared/axios'
import { AuthPage, Credentials, LoginSuccessData } from '@shared/web-pages'

import { loadAccompanimentsRequestAction } from '~/store/modules/accompaniments/actions'
import { logInSuccess } from '~/store/modules/auth/actions'
import { keepConnectedRequest } from '~/store/modules/preferences/actions'

import { version } from '../../package.json'

const Next = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [, haveToken] = useAxios()

  const updateToken = useSetToken()

  const handleLoginSuccess = useCallback(
    ({ keepConnected }: Credentials, { user, token }: LoginSuccessData) => {
      updateToken(token)

      dispatch(keepConnectedRequest(keepConnected))
      dispatch(logInSuccess(user, token))

      router.push('/home')
    },
    [dispatch, updateToken, router]
  )

  useEffect(() => {
    if (!haveToken) {
      return
    }

    dispatch(loadAccompanimentsRequestAction())
  }, [haveToken, dispatch])

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Auth</title>
      </Head>

      <AuthPage
        icon="/images/logo.png"
        title="FollowUP Compras"
        version={version}
        onLogInSuccess={handleLoginSuccess}
        credentials={{
          email: 'admin@dantasdistribuidora.com.br',
          password: '571043',
          keepConnected: true
        }}
      />
    </React.Fragment>
  )
}

export default Next
