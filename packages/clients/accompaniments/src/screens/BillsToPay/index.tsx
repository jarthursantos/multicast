import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer, Event, Messages } from 'react-big-calendar'

import { format, parse, startOfWeek, getDay } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

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

const BillsToPayScreen: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      title: 'R$ 100.000,00',
      start: new Date(2020, 8, 30),
      end: new Date(2020, 8, 30),
      allDay: true
    },
    {
      title: 'R$ 100.000,00',
      start: new Date(2020, 9, 5),
      end: new Date(2020, 9, 5),
      allDay: true
    },
    {
      title: 'R$ 75.000,00',
      start: new Date(2020, 9, 6),
      end: new Date(2020, 9, 6),
      allDay: true
    },
    {
      title: 'R$ 13.000,00',
      start: new Date(2020, 9, 7),
      end: new Date(2020, 9, 7),
      allDay: true
    },
    {
      title: 'R$ 25.000,00',
      start: new Date(2020, 9, 8),
      end: new Date(2020, 9, 8),
      allDay: true
    },
    {
      title: 'R$ 57.000,00',
      start: new Date(2020, 9, 12),
      end: new Date(2020, 9, 12),
      allDay: true
    },
    {
      title: 'R$ 98.000,00',
      start: new Date(2020, 9, 13),
      end: new Date(2020, 9, 13),
      allDay: true
    },
    {
      title: 'R$ 100.000,00',
      start: new Date(2020, 9, 14),
      end: new Date(2020, 9, 14),
      allDay: true
    },
    {
      title: 'R$ 9.000,00',
      start: new Date(2020, 9, 15),
      end: new Date(2020, 9, 15),
      allDay: true
    },
    {
      title: 'R$ 91.000,00',
      start: new Date(2020, 9, 16),
      end: new Date(2020, 9, 16),
      allDay: true
    },
    {
      title: 'R$ 2.000,00',
      start: new Date(2020, 9, 19),
      end: new Date(2020, 9, 19),
      allDay: true
    },
    {
      title: 'R$ 500,00',
      start: new Date(2020, 9, 20),
      end: new Date(2020, 9, 20),
      allDay: true
    },
    {
      title: 'R$ 150.000,00',
      start: new Date(2020, 9, 21),
      end: new Date(2020, 9, 21),
      allDay: true
    },
    {
      title: 'R$ 88.000,00',
      start: new Date(2020, 9, 22),
      end: new Date(2020, 9, 22),
      allDay: true
    },
    {
      title: 'R$ 1.000.000,00',
      start: new Date(2020, 9, 26),
      end: new Date(2020, 9, 26),
      allDay: true
    },
    {
      title: 'R$ 500.000,00',
      start: new Date(2020, 9, 27),
      end: new Date(2020, 9, 27),
      allDay: true
    }
  ])

  return (
    <Calendar
      localizer={localizer}
      events={events}
      defaultView={'month'}
      views={['month']}
      culture={'pt-BR'}
      messages={messages}
      components={{ toolbar: Toolbar }}
    />
  )
}

export { BillsToPayScreen }
