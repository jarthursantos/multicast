import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { extractErrorMessage, useAxios } from '@shared/axios'
import { Page } from '@shared/web-components'

import Search, { SearchData } from '../../components/Search'
import Employee, { EmployeeData } from './Employee'
import {
  Wrapper,
  ScrollBar,
  Container,
  Separator,
  MessageContainer
} from './styles'

const Home: React.FC = () => {
  const api = useAxios()
  const [employees, setEmployees] = useState<EmployeeData[]>()

  const handleSearch = useCallback(
    async (search: SearchData) => {
      try {
        const response = await api.get<EmployeeData[]>('employees', {
          params: search
        })

        setEmployees(response.data)
      } catch (error) {
        const message = extractErrorMessage(error)

        toast.error(message)
      }
    },
    [api]
  )

  return (
    <Page title="Situação dos funcionários">
      <Wrapper>
        <Search onSearchResult={handleSearch} />

        <Separator />

        {!employees && (
          <MessageContainer>
            Pesquise por algum nome para começar
          </MessageContainer>
        )}

        {(employees?.length || 0) === 0 && (
          <MessageContainer>Nenhum funcionário encontrado</MessageContainer>
        )}

        {employees && (
          <ScrollBar>
            <Container>
              {employees.map(employee => (
                <Employee key={employee.code} {...employee} />
              ))}
            </Container>
          </ScrollBar>
        )}
      </Wrapper>
    </Page>
  )
}

export default Home
