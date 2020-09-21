import React, { useCallback, useRef } from 'react'

import { useFormValidator } from 'hookable-unform'

import {
  Form,
  FormHandles,
  SubmitButton,
  TextInput,
  useFieldWatch
} from '@shared/web-components/Form'

import { schema } from './schema'
import { Container } from './styles'
import { SearchData } from './types'

export interface SearchProps {
  onSearchResult(search: SearchData): void
}

const Search: React.FC<SearchProps> = ({ onSearchResult }) => {
  const formRef = useRef<FormHandles>(null)
  const validateForm = useFormValidator(formRef, schema)

  useFieldWatch(formRef, 'code')

  const handleSubmit = useCallback(
    async (data: SearchData) => {
      const { success } = await validateForm()

      if (success && onSearchResult) {
        formRef.current?.setErrors({})

        onSearchResult(data)
      }
    },
    [onSearchResult, validateForm, formRef]
  )

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
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
