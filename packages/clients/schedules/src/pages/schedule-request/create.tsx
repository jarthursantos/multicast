import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { CreateScheduleRequestScreen } from '~/screens/ScheduleRequest/Create'
import { useCreateScheduleRequestPayload } from '~/windows/schedule-request/create/actions'

const CreateScheduleRequest = () => {
  const token = useCreateScheduleRequestPayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Adicionar Pré Agendamento</title>
      </Head>

      <CreateScheduleRequestScreen />
    </React.Fragment>
  )
}

export default CreateScheduleRequest
