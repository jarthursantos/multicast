import React from 'react'

import {
  SubmitButton,
  DateInput,
  ProviderInput,
  ActionsContainer
} from '@shared/web-components/Form'

import { Wrapper, Container } from './styles'

const CreateScheduleScreen: React.VFC = () => {
  return (
    <Wrapper onSubmit={console.log}>
      <Container>
        <DateInput name="date" label="Data" />

        <ProviderInput name="providers" label="Fornecedores" />
      </Container>

      <ActionsContainer>
        <SubmitButton label="Criar Agendamento" />
      </ActionsContainer>
    </Wrapper>
  )
}

export { CreateScheduleScreen }
