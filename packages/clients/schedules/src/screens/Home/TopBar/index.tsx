import React from 'react'

import { Ribbon, TabBar } from '@shared/web-components'

import { HomeScreenTopBarReportsOptions } from '../TopBar/Reports'
import { HomeScreenTopBarSchedulesOptions } from '../TopBar/Schedules'
import { HomeScreenTabs } from '../types'

const HomeTopBar: React.VFC = () => {
  return (
    <>
      <Ribbon.Bar initialTab={HomeScreenTabs.SCHEDULES}>
        <TabBar.Button name={HomeScreenTabs.SCHEDULES} label="Agendamentos" />
        <TabBar.Button name={HomeScreenTabs.REPORTS} label="Relatórios" />
      </Ribbon.Bar>

      <Ribbon.Options>
        <HomeScreenTopBarSchedulesOptions />
        <HomeScreenTopBarReportsOptions />
      </Ribbon.Options>
    </>
  )
}

export { HomeTopBar }
