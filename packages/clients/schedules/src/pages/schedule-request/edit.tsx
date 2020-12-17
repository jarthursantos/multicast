import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { EditScheduleRequestScreen } from '~/screens/ScheduleRequest/Edit'
import { useEditScheduleRequestPayload } from '~/windows/schedule-request/edit/actions'

const EditScheduleRequest = () => {
  const [scheduleRequest, token] = useEditScheduleRequestPayload()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>Editar Pré Agendamento</title>
      </Head>

      <EditScheduleRequestScreen scheduleRequest={scheduleRequest} />
    </React.Fragment>
  )
}

export default EditScheduleRequest
