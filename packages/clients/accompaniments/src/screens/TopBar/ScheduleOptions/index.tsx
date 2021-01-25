import React, { useCallback, useContext, useRef } from 'react'
import {
  MdRefresh,
  MdAddCircleOutline,
  MdViewDay,
  MdViewWeek
} from 'react-icons/md'

import {
  TabOptions,
  ActionIconButton,
  ButtonGroup
} from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenContext } from '~/screens/context'
import { HomeScreenTabs, ScheduleTabs } from '~/screens/types'
import { openCreateSchedule } from '~/windows/CreateSchedule/action'

import { ScheduleFilter, ScheduleFilterHandles } from './FilterDialog'

const HomeScreenTopBarScheduleOptions: React.FC = () => {
  const filterRef = useRef<ScheduleFilterHandles>(null)
  const filterButtonRef = useRef<HTMLDivElement>(null)

  const { currentScheduleTab, changeScheduleTab } = useContext(
    HomeScreenContext
  )

  const handleFilter = useCallback(() => {
    filterRef.current?.open(filterButtonRef.current.getBoundingClientRect())
  }, [filterRef, filterButtonRef])

  return (
    <React.Fragment>
      <TabOptions.Content name={HomeScreenTabs.SCHEDULES}>
        <ButtonGroup
          currentButton={currentScheduleTab}
          onSelectionChange={changeScheduleTab}
        >
          <ButtonGroup.Button
            name={ScheduleTabs.DAY}
            label="Dia"
            icon={<MdViewDay />}
            width={80}
          />

          <ButtonGroup.Button
            name={ScheduleTabs.WEEK}
            label="Semana"
            icon={<MdViewWeek />}
            width={80}
          />

          <ButtonGroup.Button
            name={ScheduleTabs.MONTH}
            label="Mês"
            icon={<MdViewWeek />}
            width={80}
          />
        </ButtonGroup>

        <TabOptions.Content.Separator />

        <ActionIconButton
          icon={<MdAddCircleOutline />}
          onClick={openCreateSchedule}
          width={80}
          label="Adicionar"
        />

        <TabOptions.Content.Separator />

        <div ref={filterButtonRef}>
          <ActionIconButton
            icon={<MdFilter />}
            onClick={handleFilter}
            width={80}
            label="Aplicar Filtro"
          />
        </div>

        <ActionIconButton
          icon={<MdRefresh />}
          width={85}
          label="Recarregar Dados"
        />
      </TabOptions.Content>

      <ScheduleFilter ref={filterRef} />
    </React.Fragment>
  )
}

export { HomeScreenTopBarScheduleOptions }
