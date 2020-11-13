import { Region } from 'entities/Region'
import { winthor } from 'libs/knex-winthor'
import { IRegionRepository } from 'repositories/IRegionRepository'

export class WinThorRegionRepository implements IRegionRepository {
  async findById(id: number): Promise<Region> {
    const response = await winthor.raw<Region[]>(`
      SELECT NUMREGIAO                                               AS "code",
             REGIAO                                                  AS "name",
             DECODE(NVL(STATUS, ''), 'A', 'active', 'I', 'inactive') AS "situation"
      FROM PCREGIAO
      WHERE NUMREGIAO IS NOT NULL
        AND NVL(STATUS, 'A') <> 'I'
        AND NUMREGIAO = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<Region[]> {
    const response = await winthor.raw<Region[]>(`
      SELECT NUMREGIAO                                               AS "code",
             REGIAO                                                  AS "name",
             DECODE(NVL(STATUS, ''), 'A', 'active', 'I', 'inactive') AS "situation"
      FROM PCREGIAO
      WHERE NUMREGIAO IS NOT NULL
        AND NVL(STATUS, 'A') <> 'I'
      ORDER BY NUMREGIAO
    `)

    return response
  }
}
