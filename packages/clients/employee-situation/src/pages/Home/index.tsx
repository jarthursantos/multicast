import React from 'react'

import { Page } from '@shared/web-components'

import Search from '../../components/Search'
import { Wrapper, Container } from './styles'

const Home: React.FC = () => {
  return (
    <Page title="Situação dos funcionários">
      <Wrapper>
        <Container>
          <Search />
        </Container>

        <hr />

        <Container>{/* <Search /> */}</Container>
      </Wrapper>
    </Page>
  )
}

export default Home
