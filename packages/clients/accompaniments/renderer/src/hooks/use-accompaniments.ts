import { useEffect, useState } from 'react'

import { useAxios, useSetToken } from '@shared/axios'
import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { OptionData } from '~/components/Forms/AccompanimentData/types'
import {
  Accompaniment,
  UntrackedInvoice
} from '~/store/modules/accompaniments/types'

export function useAccompaniment(
  id: string,
  token?: string
): [Accompaniment, OptionData[]] {
  const setToken = useSetToken()
  const [api, haveToken] = useAxios()

  const [accompaniment, setAccompaniment] = useState<Accompaniment>()
  const [invoices, setInvoices] = useState<OptionData[]>()

  useEffect(() => {
    async function findAccompaniment() {
      try {
        const { data } = await api.get<Accompaniment>(`accompaniments/${id}`)

        setAccompaniment(data)
      } catch (error) {
        console.log(error)
      }
    }

    async function findInvoices() {
      try {
        const { data } = await api.get<UntrackedInvoice[]>(
          `accompaniments/${id}/untrackedInvoices`
        )

        if (data) {
          setInvoices(
            data.map(({ number, amountValue, transactionNumber }) => ({
              label: `${number} - ${formatPrice(amountValue)}`,
              value: `${transactionNumber}`
            }))
          )
        } else {
          setInvoices([])
        }
      } catch (error) {
        setInvoices([])
        console.log(error)
      }
    }

    if (haveToken) {
      findAccompaniment()
      findInvoices()
    } else if (token) {
      setToken(token)
    }
  }, [setToken, id, token, api, haveToken])

  return [accompaniment, invoices]
}
