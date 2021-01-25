import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { CreateScheduleScreen } from '~/screens/Scredules/Create'
import { useCreateSchedule } from '~/windows/CreateSchedule/action'

const Home = () => {
  const token = useCreateSchedule()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Criar Agendamento</title>
      </Head>

      <CreateScheduleScreen />
    </React.Fragment>
  )
}

export default Home
