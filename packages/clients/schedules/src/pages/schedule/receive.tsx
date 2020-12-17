import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { ReceiveScheduleScreen } from '~/screens/Schedule/Receive'
import { useReceiveSchedulePayload } from '~/windows/schedule/receive/actions'

const ReceiveSchedule = () => {
  const [schedule, token] = useReceiveSchedulePayload()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>
          Receber Agendamento {schedule?.shippingName.toUpperCase()}
        </title>
      </Head>

      <ReceiveScheduleScreen schedule={schedule} />
    </React.Fragment>
  )
}

export default ReceiveSchedule
