import React, { useCallback, useRef } from 'react'

import {
  Form,
  FormHandles,
  SubmitButton,
  TextInput,
  NumberInput,
  useFieldWatch
} from '@shared/web-components/Form'

import { Container } from './styles'
import { SearchData } from './types'

const Search: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  useFieldWatch(formRef, 'code')

  const handleSubmit = useCallback((data: SearchData) => {
    console.log(data)
  }, [])

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={{ code: 100, name: 'Arthur' }}
    >
      <Container>
        <NumberInput name="code" label="Matrícula" />

        <TextInput name="name" label="Nome do Funcionário" className="name" />

        <SubmitButton label="Pesquisar" />
      </Container>
    </Form>
  )
}

export default Search
