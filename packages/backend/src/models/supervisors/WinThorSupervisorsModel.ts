import { ISupervisor } from '~/domain/ISupervisor'
import { winthor } from '~/libraries/WinThor'

import { ISupervisorsModel } from './ISupervisorsModel'

export function createWinThorSupervisorsModel(): ISupervisorsModel {
  return {
    async findById(id: number): Promise<ISupervisor> {
      const response = await winthor.raw<ISupervisor[]>(`
        SELECT PCSUPERV.CODSUPERVISOR AS "code",
               PCSUPERV.NOME          AS "name"
        FROM PCSUPERV
        WHERE PCSUPERV.CODSUPERVISOR = ${id}
      `)

      return response[0]
    },

    async findMany(): Promise<ISupervisor[]> {
      const response = await winthor.raw<ISupervisor[]>(`
        SELECT PCSUPERV.CODSUPERVISOR AS "code",
               PCSUPERV.NOME          AS "name"
        FROM PCSUPERV
        ORDER BY PCSUPERV.CODSUPERVISOR ASC
      `)

      return response
    }
  }
}
