import { useEffect, useState } from 'react'

import { useAxios, useSetToken } from '@shared/axios'

import { Accompaniment } from '~/store/modules/accompaniments/types'

export function useAccompaniment(id: string, token?: string) {
  const setToken = useSetToken()
  const [api, haveToken] = useAxios()

  const [accompaniment, setAccompaniment] = useState<Accompaniment>()

  useEffect(() => {
    async function findAccompaniment() {
      try {
        const { data } = await api.get<Accompaniment>(`accompaniments/${id}`)

        setAccompaniment(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (haveToken) {
      findAccompaniment()
    } else if (token) {
      setToken(token)
    }
  }, [setToken, id, token, api, haveToken])

  return accompaniment
}
