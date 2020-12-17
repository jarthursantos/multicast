import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { EditClosedScheduleScreen } from '~/screens/Schedule/Edit/Closed'
import { useEditClosedSchedulePayload } from '~/windows/schedule/edit/actions'

const EditClosedSchedule = () => {
  const [schedule, token] = useEditClosedSchedulePayload()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>Editar Agendamento {schedule?.shippingName.toUpperCase()}</title>
      </Head>

      <EditClosedScheduleScreen schedule={schedule} />
    </React.Fragment>
  )
}

export default EditClosedSchedule
