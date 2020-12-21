import React from 'react'
import { ToolbarProps, Event } from 'react-big-calendar'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import { Button } from '@shared/web-components'

import { Wrapper, IconButton, CurrentDate } from './styles'

const Toolbar: React.VFC<ToolbarProps<Event, object>> = ({
  label,
  onNavigate
}) => {
  return (
    <Wrapper>
      <Button label="Mês Atual" secondary onClick={() => onNavigate('TODAY')} />

      <IconButton onClick={() => onNavigate('PREV')}>
        <MdChevronLeft size={24} />
      </IconButton>

      <IconButton onClick={() => onNavigate('NEXT')}>
        <MdChevronRight size={24} />
      </IconButton>

      <CurrentDate>{label}</CurrentDate>
    </Wrapper>
  )
}

export { Toolbar }
