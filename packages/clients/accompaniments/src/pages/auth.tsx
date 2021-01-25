import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import { useSetToken } from '@shared/axios'
import { AuthPage, Credentials, LoginSuccessData } from '@shared/web-pages'

import { useTypedSelector } from '~/store'
import { logInSuccess } from '~/store/modules/auth/actions'
import { keepConnectedRequest } from '~/store/modules/preferences/actions'

import { version } from '../../package.json'

const Next = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const updateToken = useSetToken()

  const { user } = useTypedSelector(state => state.auth)
  const { keepConnected } = useTypedSelector(state => state.preferences)

  const handleLoginSuccess = useCallback(
    ({ keepConnected }: Credentials, { user, token }: LoginSuccessData) => {
      updateToken(token)

      dispatch(keepConnectedRequest(keepConnected))
      dispatch(logInSuccess(user, token))

      router.push('/home')
    },
    [dispatch, updateToken, router]
  )

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Entrar</title>
      </Head>

      <AuthPage
        icon="/images/logo.jpeg"
        title="FollowUP Compras"
        version={version}
        onLogInSuccess={handleLoginSuccess}
        credentials={{
          email: user?.email,
          password: user?.password,
          keepConnected
        }}
      />
    </React.Fragment>
  )
}

export default Next
