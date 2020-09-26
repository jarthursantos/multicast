import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Head from 'next/head'

import { useTypedSelector } from '../../store'
import { logInRequest } from '../../store/modules/auth/actions'

const Home = () => {
  const dispatch = useDispatch()
  const { user } = useTypedSelector(state => state.auth)

  const handleDispatch = useCallback(() => {
    dispatch(logInRequest({ email: '', password: '', keepConnected: false }))
  }, [dispatch])

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h1>{user?.name || 'Home'}</h1>
        <button onClick={handleDispatch}>Dispatch</button>
      </div>
    </React.Fragment>
  )
}

export default Home
