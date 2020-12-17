import React, { useEffect } from 'react'
import ScrollBar from 'react-perfect-scrollbar'

import Head from 'next/head'
import styled from 'styled-components'

import { useSetToken, useAxios } from '@shared/axios'
import { Form, NumberInput, BuyerInput } from '@shared/web-components/Form'
import { ProviderInput } from '@shared/web-components/Form/Inputs/ProviderInput'

import { useAccompanimentFilters } from '~/windows/AccompanimentFilters/action'

const Home = () => {
  const [api, haveToken] = useAxios()
  const setToken = useSetToken()

  const [filters, token] = useAccompanimentFilters()

  useEffect(() => {
    console.log({ filters, token, api, haveToken })
  }, [filters, token, api, haveToken])

  useEffect(() => setToken(token), [setToken, token])

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Acompanhamento - Filtros</title>
      </Head>

      <ScrollBar>
        <Wrapper>
          <h2>Filtros</h2>

          <Form onSubmit={console.log}>
            <Container>
              <h3>Comprador</h3>

              <BuyerInput name="buyer" label="(Código, Nome)" />

              <h3>Fornecedor</h3>

              <ProviderInput name="provider" label="(Código, Nome, Fantasia)" />

              <h3>Número do Pedido</h3>

              <Inline>
                <NumberInput name="numberFrom" label="De" />
                <NumberInput name="numberTo" label="Até" />
              </Inline>

              <h3>Emissão do Pedido</h3>

              <Inline>
                <NumberInput name="periodFrom" label="De" />
                <NumberInput name="periodTo" label="Até" />
              </Inline>
            </Container>
          </Form>
        </Wrapper>
      </ScrollBar>
    </React.Fragment>
  )
}

export default Home

const Wrapper = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 18px;
    font-weight: 500;
    margin-top: 16px;
    margin-left: 16px;
  }
`

const Container = styled.div`
  padding: 16px;
  padding-top: 8px;

  h3 {
    color: ${({ theme }) => theme.colors.text.secondary.dark};
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  & > div + h3 {
    margin-top: 8px;
  }
`

const Inline = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`
