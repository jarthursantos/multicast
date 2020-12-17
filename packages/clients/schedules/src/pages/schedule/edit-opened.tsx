import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { EditOpenedScheduleScreen } from '~/screens/Schedule/Edit/Opened'
import { useEditOpenedSchedulePayload } from '~/windows/schedule/edit/actions'

const EditOpenedSchedule = () => {
  const [schedule, token] = useEditOpenedSchedulePayload()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>Editar Agendamento {schedule?.shippingName.toUpperCase()}</title>
      </Head>

      <EditOpenedScheduleScreen schedule={schedule} />
    </React.Fragment>
  )
}

export default EditOpenedSchedule
