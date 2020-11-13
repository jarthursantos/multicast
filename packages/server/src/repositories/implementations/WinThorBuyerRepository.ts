import { Buyer } from 'entities/Buyer'
import { winthor } from 'libs/knex-winthor'
import { IBuyerRepository } from 'repositories/IBuyerRepository'

export class WinThorBuyerRepository implements IBuyerRepository {
  async findById(id: number): Promise<Buyer> {
    const response = await winthor.raw<Buyer[]>(`
      SELECT MATRICULA AS "code",
             NOME      AS "name"
      FROM PCEMPR
      WHERE CODSETOR IN (SELECT CODSETORCOMPRADOR FROM PCCONSUM)
        AND MATRICULA = ${id}
      ORDER BY NOME
    `)

    return response[0]
  }

  async findMany(): Promise<Buyer[]> {
    const response = await winthor.raw<Buyer[]>(`
      SELECT MATRICULA AS "code",
             NOME      AS "name"
      FROM PCEMPR
      WHERE CODSETOR IN (SELECT CODSETORCOMPRADOR FROM PCCONSUM)
      ORDER BY NOME
    `)

    return response
  }
}
