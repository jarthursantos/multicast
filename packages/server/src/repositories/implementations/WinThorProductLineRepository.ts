import { ProductLine } from 'entities/ProductLine'
import { winthor } from 'libs/knex-winthor'
import { IProductLineRepository } from 'repositories/IProductLineRepository'

export class WinThorProductLineRepository implements IProductLineRepository {
  async findById(id: number): Promise<ProductLine> {
    const response = await winthor.raw<ProductLine[]>(`
      SELECT CODLINHA  AS "code",
             DESCRICAO AS "name"
      FROM PCLINHAPROD
      WHERE CODLINHA = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<ProductLine[]> {
    const response = await winthor.raw<ProductLine[]>(`
      SELECT CODLINHA  AS "code",
             DESCRICAO AS "name"
      FROM PCLINHAPROD
      WHERE CODLINHA IS NOT NULL
      ORDER BY CODLINHA
    `)

    return response
  }
}
