import React from 'react'
import { ToolbarProps, Event } from 'react-big-calendar'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import { Button, Form, SelectInput } from '@shared/web-components'

import { Wrapper, Header, IconButton, CurrentDate } from './styles'

const Toolbar: React.VFC<ToolbarProps<Event, object>> = ({
  label,
  onNavigate
}) => {
  return (
    <Wrapper>
      <Header>
        <Button label="Hoje" secondary onClick={() => onNavigate('TODAY')} />

        <IconButton onClick={() => onNavigate('PREV')}>
          <MdChevronLeft size={24} />
        </IconButton>

        <IconButton onClick={() => onNavigate('NEXT')}>
          <MdChevronRight size={24} />
        </IconButton>

        <CurrentDate>{label}</CurrentDate>
      </Header>

      <Form onSubmit={console.log} initialData={{ buyer: 353 }}>
        <SelectInput
          name="buyer"
          inputProps={{
            options: [
              { label: 'Paulo Alexandre Reis (355)', value: 355 },
              { label: 'Paulo Reis (353)', value: 353 }
            ]
          }}
        />
      </Form>
    </Wrapper>
  )
}

export { Toolbar }
