import { Supervisor } from 'entities/Supervisor'
import { winthor } from 'libs/knex-winthor'
import { ISupervisorRepository } from 'repositories/ISupervisorRepository'

export class WinThorSupervisorRepository implements ISupervisorRepository {
  async findById(id: number): Promise<Supervisor> {
    const response = await winthor.raw<Supervisor[]>(`
      SELECT PCSUPERV.CODSUPERVISOR AS "code",
             PCSUPERV.NOME          AS "name"
      FROM PCSUPERV
      WHERE PCSUPERV.CODSUPERVISOR = ${id}
    `)

    return response[0]
  }

  async findMany(): Promise<Supervisor[]> {
    const response = await winthor.raw<Supervisor[]>(`
      SELECT PCSUPERV.CODSUPERVISOR AS "code",
             PCSUPERV.NOME          AS "name"
      FROM PCSUPERV
      ORDER BY PCSUPERV.CODSUPERVISOR ASC
    `)

    return response
  }
}
