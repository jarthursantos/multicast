import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { api, extractErrorMessage } from '@shared/axios'
import { Page } from '@shared/web-components'

import Search, { SearchData } from '../../components/Search'
import Employee, { EmployeeData } from './Employee'
import { Wrapper, ScrollBar, Container, Separator } from './styles'

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>()

  const handleSearch = useCallback(async (search: SearchData) => {
    try {
      const response = await api.get<EmployeeData[]>('searchEmployees', {
        params: search
      })

      setEmployees(response.data)
    } catch (error) {
      const message = extractErrorMessage(error)

      toast.error(message)
    }
  }, [])

  return (
    <Page title="Situação dos funcionários">
      <Wrapper>
        <Search onSearchResult={handleSearch} />

        <Separator />

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
