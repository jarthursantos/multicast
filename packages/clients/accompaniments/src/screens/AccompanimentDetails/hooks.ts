import { useMemo, useState, useEffect } from 'react'

import { useAxios } from '@shared/axios'
import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { OptionData } from '~/components/Forms/AccompanimentData/types'
import {
  Accompaniment,
  UntrackedInvoice
} from '~/store/modules/accompaniments/types'

export function useChecks(accompaniment?: Accompaniment) {
  const sended = useMemo(() => !!accompaniment?.sendedAt, [accompaniment])
  const reviewed = useMemo(() => !!accompaniment?.reviewedAt, [accompaniment])
  const released = useMemo(() => !!accompaniment?.releasedAt, [accompaniment])
  const scheduled = useMemo(() => !!accompaniment?.schedule, [accompaniment])
  const unlocked = useMemo(() => !!accompaniment?.schedule?.unlockedAt, [
    accompaniment
  ])
  const finished = useMemo(() => !!accompaniment?.finishedAt, [accompaniment])

  return { sended, reviewed, released, scheduled, unlocked, finished }
}

export function useInvoices(accompaniment?: Accompaniment) {
  const [invoices, setInvoices] = useState<OptionData[]>([])

  const [api, haveToken] = useAxios()

  useEffect(() => {
    async function loadInvoices() {
      try {
        const { data } = await api.get<UntrackedInvoice[]>(
          `accompaniments/${accompaniment.id}/untrackedInvoices`
        )

        if (data) {
          setInvoices(
            data.map(({ number, amountValue, transactionNumber }) => ({
              label: `${number} - ${formatPrice(amountValue)}`,
              value: transactionNumber
            }))
          )
        } else {
          setInvoices([])
        }
      } catch (error) {
        setInvoices([])
      }
    }

    if (accompaniment && haveToken) {
      loadInvoices()
    }
  }, [accompaniment, api, haveToken])

  return invoices
}
