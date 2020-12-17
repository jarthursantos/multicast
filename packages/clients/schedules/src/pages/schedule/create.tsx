import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { CreateScheduleScreen } from '~/screens/Schedule/Create'
import { useCreateSchedulePayload } from '~/windows/schedule/create/actions'

const CreateSchedule = () => {
  const token = useCreateSchedulePayload()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>Adicionar Agendamento</title>
      </Head>

      <CreateScheduleScreen />
    </React.Fragment>
  )
}

export default CreateSchedule
