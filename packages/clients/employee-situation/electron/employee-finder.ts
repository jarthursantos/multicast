import { Connection } from 'oracledb'

export interface Employee {
  name: string
  code: number
  sector: string
  func?: string
  type?: 'F' | 'M' | 'A'
  situation?: 'I' | 'A'
}

export async function findEmployeesByName(
  connection: Connection,
  name: string
): Promise<Employee[]> {
  const result: Employee[] = []

  const employees = await connection.execute<Employee>(`
    SELECT MATRICULA,
          NOME,
          PCEMPR.CODSETOR,
          PCSETOR.DESCRICAO,
          DTDEMISSAO,
          TIPO,
          SITUACAO,
          FUNCAO
    FROM PCEMPR
          LEFT JOIN PCSETOR ON PCEMPR.CODSETOR = PCSETOR.CODSETOR
    WHERE NOME LIKE '%${name}%';
  `)

  employees.rows?.forEach(employee => {
    result.push(employee)
  })

  return result
}
