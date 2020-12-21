import { ISquare } from '~/domain/ISquare'
import { winthor } from '~/libraries/WinThor'

import { ISquareModels } from './ISquaresModel'

export function createWinThorsquaresModel(): ISquareModels {
  return {
    async findById(id: number): Promise<ISquare> {
      const response = await winthor.raw<ISquare[]>(`
        SELECT CODPRACA AS "code",
               PRACA    AS "name"
        FROM PCPRACA
        WHERE CODPRACA = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<ISquare[]> {
      const response = await winthor.raw<ISquare[]>(`
        SELECT CODPRACA AS "code",
               PRACA    AS "name"
        FROM PCPRACA
        ORDER BY PRACA
      `)

      return response
    }
  }
}
