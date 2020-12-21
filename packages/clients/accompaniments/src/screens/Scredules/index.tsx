import React, { useContext, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event, Messages } from 'react-big-calendar'

import { addHours, format, parse, startOfWeek, getDay } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { HomeScreenContext } from '~/screens/context'

import { ScheduleTabs } from '../types'
import { Toolbar } from './Toolbar'

const localizer = dateFnsLocalizer({
  parse,
  format,
  getDay,
  startOfWeek,
  locales: { 'pt-BR': ptBR }
})

const messages: Messages = {
  today: 'Hoje',
  next: 'Próximo',
  previous: 'Anterior',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  date: 'Data',
  event: 'Evento',
  time: 'Tempo',
  tomorrow: 'Amanhã',
  allDay: 'Dia todo',
  yesterday: 'Ontem',
  agenda: 'Agenda',
  work_week: 'Semana de trabalho',
  noEventsInRange: 'Sem eventos no intervalo',
  showMore: count => `Mostrar mais ${count}`
}

const ScredulesScreen: React.FC = () => {
  const [events] = useState<Event[]>([
    // setEvents
    {
      title: 'Wesley',
      start: new Date(),
      end: addHours(new Date(), 2)
    }
  ])

  const { currentScheduleTab, changeScheduleTab } = useContext(
    HomeScreenContext
  )

  return (
    <Calendar
      localizer={localizer}
      events={events}
      defaultView={'work_week'}
      views={['month', 'work_week', 'day']}
      culture={'pt-BR'}
      messages={messages}
      onSelectSlot={console.log}
      components={{ toolbar: Toolbar }}
      min={new Date(0, 0, 0, 7, 0, 0)}
      max={new Date(0, 0, 0, 18, 0, 0)}
      view={currentScheduleTab === ScheduleTabs.DAY ? 'day' : 'work_week'}
      onView={view =>
        changeScheduleTab(view === 'day' ? ScheduleTabs.DAY : ScheduleTabs.WEEK)
      }
    />
  )
}

export { ScredulesScreen }
