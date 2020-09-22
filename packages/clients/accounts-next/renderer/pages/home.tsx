import React, { useCallback } from 'react'

import Head from 'next/head'
import Link from 'next/link'

import { useAxios } from '@shared/axios'

const Home = () => {
  const api = useAxios()

  const handleGithub = useCallback(async () => {
    const { data } = await api.get('/users/jarthursantos')

    console.log({ data })
  }, [api])

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h4>Material-UI</h4>
        <img src="/images/logo.png" onClick={handleGithub} />
        <Link href="/next">
          <a>Go to the next page</a>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Home
