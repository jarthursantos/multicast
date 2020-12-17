import React from 'react'

import Head from 'next/head'

import { HomeScreen } from '~/screens'

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras</title>
      </Head>

      <HomeScreen />
    </React.Fragment>
  )
}

export default Home
