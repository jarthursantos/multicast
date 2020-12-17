import React from 'react'

import { Content } from './Content'
import { DatePicker } from './DatePicker'
import { Wrapper } from './styles'

const ScredulesScreen: React.VFC = () => {
  return (
    <Wrapper>
      <DatePicker />

      <Content />
    </Wrapper>
  )
}

export { ScredulesScreen }
