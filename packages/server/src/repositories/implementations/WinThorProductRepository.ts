import { BasicProduct } from 'entities/Product'
import { winthor } from 'libs/knex-winthor'
import { IProductRepository } from 'repositories/IProductsRepository'

export class WinThorProductRepository implements IProductRepository {
  async findById(id: number): Promise<BasicProduct> {
    const response = await winthor.raw<BasicProduct[]>(`
      SELECT CODPROD   AS "code",
             DESCRICAO AS "name"
      FROM PCPRODUT
      WHERE CODPROD IS NOT NULL
        AND DTEXCLUSAO IS NULL
        AND CODPROD = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<BasicProduct[]> {
    const response = await winthor.raw<BasicProduct[]>(`
      SELECT CODPROD   AS "code",
             DESCRICAO AS "name"
      FROM PCPRODUT
      WHERE CODPROD IS NOT NULL
        AND DTEXCLUSAO IS NULL
      ORDER BY CODPROD
    `)

    return response
  }
}
