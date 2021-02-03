import {
  Agenda,
  Types,
  CreateAgendaDTO,
  CreateAgendaFailureAction,
  CreateAgendaRequestAction,
  CreateAgendaSuccessAction,
  LoadAgendaFailureAction,
  LoadAgendaRequestAction,
  LoadAgendaSuccessAction
} from './types'

export function loadAgendaRequest(): LoadAgendaRequestAction {
  return {
    type: Types.LOAD_AGENDA_REQUEST
  }
}

export function loadAgendaFailure(message: string): LoadAgendaFailureAction {
  return {
    propagate: true,
    type: Types.LOAD_AGENDA_FAILURE,
    payload: { message }
  }
}

export function loadAgendaSuccess(agenda: Agenda[]): LoadAgendaSuccessAction {
  return {
    propagate: true,
    type: Types.LOAD_AGENDA_SUCCESS,
    payload: { agenda }
  }
}

export function createAgendaRequest(
  data: CreateAgendaDTO
): CreateAgendaRequestAction {
  return {
    type: Types.CREATE_AGENDA_REQUEST,
    payload: { data }
  }
}

export function createAgendaSuccess(agenda: Agenda): CreateAgendaSuccessAction {
  return {
    propagate: true,
    type: Types.CREATE_AGENDA_SUCCESS,
    payload: { agenda }
  }
}

export function createAgendaFailure(
  message: string
): CreateAgendaFailureAction {
  return {
    type: Types.CREATE_AGENDA_FAILURE,
    payload: { message }
  }
}
