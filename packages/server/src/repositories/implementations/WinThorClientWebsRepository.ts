import { ClientWeb } from 'entities/Clients'
import { winthor } from 'libs/knex-winthor'
import { IClientWebsRepository } from 'repositories/IClientWebsRepository'

export class WinThorClientWebsRepository implements IClientWebsRepository {
  async findById(id: number): Promise<ClientWeb> {
    const response = await winthor.raw<ClientWeb[]>(`
      SELECT CODREDE   AS "code",
             DESCRICAO AS "name"
      FROM PCREDECLIENTE
      WHERE CODREDE = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<ClientWeb[]> {
    const response = await winthor.raw<ClientWeb[]>(`
      SELECT CODREDE   AS "code",
             DESCRICAO AS "name"
      FROM PCREDECLIENTE
      ORDER BY CODREDE
    `)

    return response
  }
}
