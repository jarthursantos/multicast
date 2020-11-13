import { Client } from 'entities/Clients'
import { winthor } from 'libs/knex-winthor'
import { IClientsRepository } from 'repositories/IClientsRepository'

export class WinThorClientsRepository implements IClientsRepository {
  async findById(id: number): Promise<Client> {
    const response = await winthor.raw<Client[]>(`
      SELECT CODCLI   AS "code",
             CLIENTE  AS "name",
             FANTASIA AS "fantasy",
             CGCENT   AS "cnpj"
      FROM PCCLIENT
      WHERE CODCLI = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<Client[]> {
    const response = await winthor.raw<Client[]>(`
      SELECT CODCLI   AS "code",
             CLIENTE  AS "name",
             FANTASIA AS "fantasy",
             CGCENT   AS "cnpj"
      FROM PCCLIENT
      WHERE CODCLI IS NOT NULL
      ORDER BY CLIENTE
    `)

    return response
  }
}
