import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { ipcRenderer } from 'electron'
import Head from 'next/head'

import { useTypedSelector } from '../../store'
import { logInRequest } from '../../store/modules/auth/actions'

const Next = () => {
  const dispatch = useDispatch()

  const { user } = useTypedSelector(state => state.auth)

  const handleDispatch = useCallback(() => {
    dispatch(logInRequest({ email: '', password: '', keepConnected: false }))
  }, [dispatch])

  const handleOpenHome = useCallback(() => {
    ipcRenderer.send('openHome')
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Auth</title>
      </Head>

      <div>
        <h1>{user?.name || 'Auth'}</h1>

        <button onClick={handleOpenHome}>Open Home</button>
        <button onClick={handleDispatch}>Dispatch</button>
      </div>
    </React.Fragment>
  )
}

export default Next
