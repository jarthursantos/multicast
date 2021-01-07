import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'

import { FormHandles } from '@unform/core'
import { remote } from 'electron'
import { debounce } from 'lodash'

import { api, extractErrorMessage } from '@shared/axios'
import { Button, TextInput, SubmitButton } from '@shared/web-components'
import { Table } from '@shared/web-components/Table'

import { useFieldWatch } from '../../../watch'
import { IBuyer } from '../index'
import { replyBuyers, useBuyerFinderOptions } from './action'
import { Wrapper, FieldsWrapper, TableWrapper, ActionsWrapper } from './styles'

function normalizeString(str: string) {
  return (str || '').trim().toUpperCase()
}

const applyFilter = debounce(
  (criteria: string, buyers: IBuyer[], onEnd: (result: IBuyer[]) => void) => {
    const filter = normalizeString(criteria)

    if (filter) {
      const result = buyers.filter(({ code, name }) => {
        const normalizedName = normalizeString(name)
        if (normalizedName.includes(filter)) {
          return true
        }

        const normalizedCode = String(code)
        if (normalizedCode.includes(filter)) {
          return true
        }

        return false
      })

      return onEnd(result)
    }

    return onEnd(buyers)
  },
  400
)

const BuyerFinderScreen: React.VFC = () => {
  const formRef = useRef<FormHandles>(null)

  const isSingle = useBuyerFinderOptions()

  const [loading, setLoading] = useState(false)
  const [buyers, setBuyers] = useState<IBuyer[]>()
  const [selections, setSelections] = useState<IBuyer[]>([])
  const [filteredBuyers, setFilteredBuyers] = useState<IBuyer[]>()

  const filter = useFieldWatch<string>(formRef, 'filter')

  const handleFilter = useCallback(() => {
    setLoading(true)

    applyFilter(filter, buyers, result => {
      setLoading(false)
      setFilteredBuyers(result)
    })
  }, [filter, buyers])

  const handleConfirm = useCallback((result: IBuyer[]) => {
    replyBuyers(result)

    remote?.getCurrentWindow().close()
  }, [])

  useEffect(handleFilter, [filter, handleFilter])

  useEffect(() => {
    async function loadBuyers() {
      try {
        const { data } = await api.get<IBuyer[]>(
          'http://192.168.1.2:3334/buyers'
        )

        setBuyers(data)
        setFilteredBuyers(data)
      } catch (error) {
        const message = extractErrorMessage(error)

        remote?.dialog.showErrorBox(
          'Erro ao carregar os compradores',
          String(message)
        )
      }
    }

    loadBuyers()
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
              data: filteredBuyers,
              rowDblClick: (_, row) => {
                row.select()

                const data: IBuyer = row.getData()

                handleConfirm([data])
              },
              rowSelectionChanged: (rows: IBuyer[]) => setSelections(rows),
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
                  width: 344,
                  field: 'name'
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

export { BuyerFinderScreen }
