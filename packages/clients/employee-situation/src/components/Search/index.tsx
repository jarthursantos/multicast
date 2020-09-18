import React, { useCallback, useRef } from 'react'

import {
  Form,
  FormHandles,
  SubmitButton,
  TextInput,
  useFieldWatch
} from '@shared/web-components/Form'

import { Container } from './styles'
import { SearchData } from './types'

export interface SearchProps {
  onSearchResult(search: SearchData): void
}

const Search: React.FC<SearchProps> = ({ onSearchResult }) => {
  const formRef = useRef<FormHandles>(null)

  useFieldWatch(formRef, 'code')

  const handleSubmit = useCallback(
    (data: SearchData) => onSearchResult && onSearchResult(data),
    [onSearchResult]
  )

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={{ code: 100, name: 'Arthur' }}
    >
      <Container>
        <TextInput
          name="name"
          className="name"
          label="Nome do Funcionário"
          inputProps={{ autoFocus: true }}
        />

        <SubmitButton label="Pesquisar" />
      </Container>
    </Form>
  )
}

export * from './types'
export default Search
