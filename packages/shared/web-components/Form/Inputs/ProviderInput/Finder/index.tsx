import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'

import { FormHandles } from '@unform/core'
import { remote } from 'electron'
import { debounce } from 'lodash'

import { api, extractErrorMessage } from '@shared/axios'
import { Button, TextInput, SubmitButton } from '@shared/web-components'
import { Table } from '@shared/web-components/Table'

import { useFieldWatch } from '../../../watch'
import { IProvider } from '../index'
import { replyProviders, useProviderFinderOptions } from './action'
import { Wrapper, FieldsWrapper, TableWrapper, ActionsWrapper } from './styles'

interface IDetailedProvider extends IProvider {
  fantasy: string
  cnpj: string
  representative: {
    name: string
  }
}

function normalizeString(str: string) {
  return (str || '').trim().toUpperCase()
}

const applyFilter = debounce(
  (
    criteria: string,
    providers: IDetailedProvider[],
    onEnd: (result: IDetailedProvider[]) => void
  ) => {
    const filter = normalizeString(criteria)

    if (filter) {
      const result = providers.filter(
        ({ code, name, fantasy, cnpj, representative }) => {
          const normalizedName = normalizeString(name)
          if (normalizedName.includes(filter)) {
            return true
          }

          const normalizedCode = String(code)
          if (normalizedCode.includes(filter)) {
            return true
          }

          if (fantasy) {
            const normalizedFantasy = normalizeString(fantasy)
            if (normalizedFantasy.includes(filter)) {
              return true
            }
          }

          if (representative.name) {
            const normalizedRepresentative = normalizeString(
              representative.name
            )

            if (normalizedRepresentative.includes(filter)) {
              return true
            }
          }

          if (cnpj) {
            const filterMatches = filter.match(/\d+/g)
            const cnpjMatches = normalizeString(cnpj).match(/\d+/g)

            if (!filterMatches || !cnpjMatches) {
              return false
            }

            const nomalizedFilter = filterMatches.join('')
            const normalizedCNPJ = cnpjMatches.join('')
            if (normalizedCNPJ.includes(nomalizedFilter)) {
              return true
            }
          }

          return false
        }
      )

      return onEnd(result)
    }

    return onEnd(providers)
  },
  400
)

const ProviderFinderScreen: React.VFC = () => {
  const formRef = useRef<FormHandles>(null)

  const isSingle = useProviderFinderOptions()

  const [loading, setLoading] = useState(false)
  const [providers, setProviders] = useState<IDetailedProvider[]>()
  const [selections, setSelections] = useState<IProvider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<
    IDetailedProvider[]
  >()

  const filter = useFieldWatch<string>(formRef, 'filter')

  const handleFilter = useCallback(() => {
    setLoading(true)

    applyFilter(filter, providers, result => {
      setLoading(false)
      setFilteredProviders(result)
    })
  }, [filter, providers])

  const handleConfirm = useCallback((result: IProvider[]) => {
    replyProviders(result)

    remote?.getCurrentWindow().close()
  }, [])

  useEffect(handleFilter, [filter, handleFilter])

  useEffect(() => {
    async function loadProviders() {
      try {
        const { data } = await api.get<IDetailedProvider[]>(
          'http://192.168.1.2:3334/providers'
        )

        setProviders(data)
        setFilteredProviders(data)
      } catch (error) {
        const message = extractErrorMessage(error)

        remote?.dialog.showErrorBox(
          'Erro ao carregar os fornecedores',
          String(message)
        )
      }
    }

    loadProviders()
  }, [])

  return (
    <Wrapper>
      <FieldsWrapper onSubmit={handleFilter} ref={formRef}>
        <TextInput
          name="filter"
          label="Filtro"
          inputProps={{ autoFocus: true }}
        />

        <SubmitButton
          label="Filtar"
          loading={loading}
          icon={<MdSearch size={24} />}
        />
      </FieldsWrapper>

      <TableWrapper>
        {isSingle !== undefined && (
          <Table
            options={{
              data: filteredProviders,
              rowDblClick: (_, row) => {
                if (!row || !row.select) return

                row.select()

                const data: IProvider = row.getData()

                handleConfirm([data])
              },
              rowSelectionChanged: (rows: IProvider[]) => setSelections(rows),
              columns: [
                {
                  title: 'Código',
                  field: 'code',
                  width: 100,
                  sorter: 'number',
                  hozAlign: 'right',
                  bottomCalc: 'count'
                },
                {
                  title: 'Fornecedor',
                  width: 350,
                  field: 'name'
                },
                {
                  title: 'Fantasia',
                  width: 200,
                  field: 'fantasy'
                },
                {
                  title: 'Representante',
                  width: 200,
                  field: 'representative.name'
                },
                {
                  title: 'CNPJ',
                  width: 200,
                  field: 'cnpj'
                }
              ],
              height: '100%',
              selectable: isSingle ? 1 : true
            }}
          />
        )}
      </TableWrapper>

      <ActionsWrapper>
        <Button
          label="Confirmar"
          disabled={selections.length === 0}
          onClick={() => handleConfirm(selections)}
        />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { ProviderFinderScreen }
