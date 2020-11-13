import { Distribuition } from 'entities/Distribuition'
import { winthor } from 'libs/knex-winthor'
import { IDistribuitionRepository } from 'repositories/IDistribuitionRepository'

export class WinThorDistribuitionRepository
  implements IDistribuitionRepository {
  async findById(id: string): Promise<Distribuition> {
    const response = await winthor.raw<Distribuition[]>(`
      SELECT CODDISTRIB AS "code",
             DESCRICAO  AS "name"
      FROM PCDISTRIB
      WHERE CODDISTRIB = '${id}'
    `)

    return response[0]
  }

  async findMany(): Promise<Distribuition[]> {
    const response = await winthor.raw<Distribuition[]>(`
      SELECT CODDISTRIB AS "code",
             DESCRICAO  AS "name"
      FROM PCDISTRIB
      WHERE CODDISTRIB IS NOT NULL
      ORDER BY DESCRICAO
    `)

    return response
  }
}
