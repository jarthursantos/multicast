import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { NonReceivedScheduleScreen } from '~/screens/Schedule/NonReceived'
import { useNonReceivedSchedulePayload } from '~/windows/schedule/non-received/actions'

const NonReceivedSchedule = () => {
  const [schedule, token] = useNonReceivedSchedulePayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Agendamento {schedule?.shippingName.toUpperCase()}</title>
      </Head>

      <NonReceivedScheduleScreen schedule={schedule} />
    </React.Fragment>
  )
}

export default NonReceivedSchedule
