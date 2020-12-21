import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import { Ribbon } from '@shared/web-components/Ribbon'

import { loadScheduleRequestRequest } from '~/store/modules/schedule-requests/actions'
import { loadSchedulesRequest } from '~/store/modules/schedules/actions'
import {
  Types,
  IAddScheduleSuccessAction
} from '~/store/modules/schedules/types'
import { openEditOpenedScheduleWindow } from '~/windows/schedule/edit/actions'

import { HomeScreenContextProvider } from './context'
import { ReportsScreen } from './Reports'
import { ScredulesScreen } from './Scredules'
import { HomeTopBar } from './TopBar'
import { HomeScreenTabs } from './types'

const HomeScreen: React.VFC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSchedulesRequest())
    dispatch(loadScheduleRequestRequest())
  }, [dispatch])

  useWatchAction<IAddScheduleSuccessAction>(({ payload }) => {
    openEditOpenedScheduleWindow(payload.schedule)
  }, Types.ADD_SCHEDULES_SUCCESS)

  return (
    <HomeScreenContextProvider>
      <Ribbon>
        <HomeTopBar />

        <Ribbon.Container>
          <Ribbon.Content name={HomeScreenTabs.SCHEDULES}>
            <ScredulesScreen />
          </Ribbon.Content>

          <Ribbon.Content name={HomeScreenTabs.REPORTS}>
            <ReportsScreen />
          </Ribbon.Content>
        </Ribbon.Container>
      </Ribbon>
    </HomeScreenContextProvider>
  )
}

export { HomeScreen }
