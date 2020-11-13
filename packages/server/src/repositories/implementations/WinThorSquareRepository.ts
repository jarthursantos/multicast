import { Square } from 'entities/Square'
import { winthor } from 'libs/knex-winthor'
import { ISquareRepository } from 'repositories/ISquareRepository'

export class WinThorSquareRepository implements ISquareRepository {
  async findById(id: number): Promise<Square> {
    const response = await winthor.raw<Square[]>(`
      SELECT CODPRACA AS "code",
             PRACA    AS "name"
      FROM PCPRACA
      WHERE CODPRACA = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<Square[]> {
    const response = await winthor.raw<Square[]>(`
      SELECT CODPRACA AS "code",
             PRACA    AS "name"
      FROM PCPRACA
      ORDER BY PRACA
    `)

    return response
  }
}
