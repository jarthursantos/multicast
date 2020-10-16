import React from 'react'

import { extractErrorMessage, useAxios } from '@shared/axios'
import {
  TextInput,
  NumberInput,
  SelectInput,
  SubmitButton
} from '@shared/web-components/Form'
import { Page } from '@shared/web-components/Page'

import {
  Wrapper,
  ScrollBar,
  Container,
  InlineContainer,
  ActionsContainer
} from './styles'

const Home: React.FC = () => {
  const [api] = useAxios()

  return (
    <Page title="Informações de Cadastro Externo">
      <Wrapper onSubmit={console.log}>
        <ScrollBar>
          <Container>
            <h2>Identificação</h2>

            <InlineContainer>
              <NumberInput name="year" label="Ano" width={80} />
              <TextInput
                id="industry"
                name="industry"
                label="Ramo de Atividade"
              />
              <NumberInput
                name="employeeCount"
                label="Nº de Funcionários"
                width={120}
              />
              <SelectInput
                id="establishment"
                name="establishment"
                label="Estabelecimento"
                inputProps={{
                  options: [
                    { value: 'FINANCING', label: 'PRÓPRIO' },
                    { value: 'OTHERS', label: 'ALUGADO' }
                  ]
                }}
              />
              <SelectInput
                id="taxOption"
                name="taxOption"
                label="Opção Tributária"
                inputProps={{
                  options: [
                    { value: 'LEASING', label: 'LUCRO REAL' },
                    { value: 'FINANCING', label: 'LUCRO PRESUMIDO' },
                    { value: 'OTHERS', label: 'SIMPLES NACIONAL' }
                  ]
                }}
              />
            </InlineContainer>

            <h2>Frota da Empresa</h2>

            <h3>Utilitários</h3>

            <InlineContainer>
              <NumberInput id="value" name="value" label="Valor Mercado" />
              <NumberInput id="onus" name="onus" label="Ônus" />
              <SelectInput
                id="onusType"
                name="onusType"
                label="Espécie de Ônus"
                inputProps={{
                  options: [
                    { value: 'LEASING', label: 'LEASING' },
                    { value: 'FINANCING', label: 'FINANCIAMENTO' },
                    { value: 'OTHERS', label: 'OUTROS' }
                  ]
                }}
              />
            </InlineContainer>

            <h3>Pesada</h3>

            <InlineContainer>
              <NumberInput id="value" name="value" label="Valor Mercado" />
              <NumberInput id="onus" name="onus" label="Ônus" />
              <SelectInput
                id="onusType"
                name="onusType"
                label="Espécie de Ônus"
                inputProps={{
                  options: [
                    { value: 'LEASING', label: 'LEASING' },
                    { value: 'FINANCING', label: 'FINANCIAMENTO' },
                    { value: 'OTHERS', label: 'OUTROS' }
                  ]
                }}
              />
            </InlineContainer>

            <h2>Bancos</h2>

            <InlineContainer>
              <TextInput id="name" name="name" label="Nome" />
              <TextInput id="agence" name="agence" label="Agência" />
              <TextInput id="account" name="account" label="Conta" />
            </InlineContainer>

            <InlineContainer>
              <TextInput id="name" name="name" label="Nome" />
              <TextInput id="agence" name="agence" label="Agência" />
              <TextInput id="account" name="account" label="Conta" />
            </InlineContainer>

            <InlineContainer>
              <TextInput id="name" name="name" label="Nome" />
              <TextInput id="agence" name="agence" label="Agência" />
              <TextInput id="account" name="account" label="Conta" />
            </InlineContainer>
          </Container>
        </ScrollBar>

        <ActionsContainer>
          <SubmitButton label="Gerar" />
        </ActionsContainer>
      </Wrapper>
    </Page>
  )
}

export default Home
