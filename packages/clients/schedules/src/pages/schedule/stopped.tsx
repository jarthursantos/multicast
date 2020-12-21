import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { StoppedScheduleScreen } from '~/screens/Schedule/Stopped'
import { useStoppedSchedulePayload } from '~/windows/schedule/stopped/actions'

const StoppedSchedule = () => {
  const [schedule, token] = useStoppedSchedulePayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Agendamento {schedule?.shippingName.toUpperCase()}</title>
      </Head>

      <StoppedScheduleScreen schedule={schedule} />
    </React.Fragment>
  )
}

export default StoppedSchedule
