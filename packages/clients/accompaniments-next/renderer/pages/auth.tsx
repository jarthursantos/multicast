import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Head from 'next/head'
import Link from 'next/link'

import { logInRequest } from '../../store/modules/auth/actions'

const Next = () => {
  const dispatch = useDispatch()

  const handleDispatch = useCallback(() => {
    dispatch(logInRequest({ email: '', password: '', keepConnected: false }))
  }, [dispatch])

  return (
    <React.Fragment>
      <Head>
        <title>Auth</title>
      </Head>

      <div>
        <h4>Material-UI</h4>
        <Link href="/home">
          <a>Go to the home page</a>
        </Link>

        <button onClick={handleDispatch}>Dispatch</button>
      </div>
    </React.Fragment>
  )
}

export default Next
