import { IProvider, IBuyer } from '@shared/web-components'
import { User } from '@shared/web-pages'

import { BaseAction } from '../types'

export enum Types {
  LOAD_AGENDA_REQUEST = '@agenda/LOAD_AGENDA_REQUEST',
  LOAD_AGENDA_SUCCESS = '@agenda/LOAD_AGENDA_SUCCESS',
  LOAD_AGENDA_FAILURE = '@agenda/LOAD_AGENDA_FAILURE',

  CREATE_AGENDA_REQUEST = '@agenda/CREATE_AGENDA_REQUEST',
  CREATE_AGENDA_SUCCESS = '@agenda/CREATE_AGENDA_SUCCESS',
  CREATE_AGENDA_FAILURE = '@agenda/CREATE_AGENDA_FAILURE'
}

export interface LoadAgendaRequestAction extends BaseAction {
  type: typeof Types.LOAD_AGENDA_REQUEST
}

export interface LoadAgendaFailureAction extends BaseAction {
  type: typeof Types.LOAD_AGENDA_FAILURE
  payload: {
    message: string
  }
}

export interface LoadAgendaSuccessAction extends BaseAction {
  type: typeof Types.LOAD_AGENDA_SUCCESS
  payload: {
    agenda: Agenda[]
  }
}

export interface CreateAgendaRequestAction extends BaseAction {
  type: typeof Types.CREATE_AGENDA_REQUEST
  payload: {
    data: CreateAgendaDTO
  }
}

export interface CreateAgendaFailureAction extends BaseAction {
  type: typeof Types.CREATE_AGENDA_FAILURE
  payload: {
    message: string
  }
}

export interface CreateAgendaSuccessAction extends BaseAction {
  type: typeof Types.CREATE_AGENDA_SUCCESS
  payload: {
    agenda: Agenda
  }
}

export type AgendaActionTypes =
  | LoadAgendaRequestAction
  | LoadAgendaFailureAction
  | LoadAgendaSuccessAction
  | CreateAgendaRequestAction
  | CreateAgendaFailureAction
  | CreateAgendaSuccessAction

export interface AgendaState {
  loading: boolean
  agenda: Agenda[]

  additingAgenda: boolean
}

export interface Agenda {
  id: string
  buyer: IBuyer
  providers: IProvider[]
  createdBy: User
  date: {
    from: Date
    to: Date
  }
}

export interface CreateAgendaDTO {
  buyer: number
  providers: number[]
  agendaFrom: Date
  agendaTo: Date
}
