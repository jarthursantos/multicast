import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'

import { AuthPage, Credentials, LoginSuccessData } from '@shared/web-pages'

import { version } from '../../package.json'
import { logInSuccess } from '../../store/modules/auth/actions'
import { keepConnectedRequest } from '../../store/modules/preferences/actions'

const Next = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLoginSuccess = useCallback(
    ({ keepConnected }: Credentials, { user, token }: LoginSuccessData) => {
      dispatch(keepConnectedRequest(keepConnected))
      dispatch(logInSuccess(user, token))

      router.push('/home')
    },
    [dispatch, router]
  )

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
      />
    </React.Fragment>
  )
}

export default Next
