import {
  Accompaniment,
  Types,
  LoadAccompanimentsSuccessAction,
  LoadAccompanimentsFailureAction,
  LoadAccompanimentsRequestAction,
  MarkAccompanimentAsSendRequestAction,
  MarkAccompanimentAsReviewedRequestAction,
  MarkAccompanimentAsReleadedRequestAction,
  MarkAccompanimentAsSendSuccessAction,
  MarkAccompanimentAsSendFailureAction,
  MarkAccompanimentAsReleadedFailureAction,
  MarkAccompanimentAsReleadedSuccessAction,
  MarkAccompanimentAsReviewedSuccessAction,
  MarkAccompanimentAsReviewedFailureAction,
  UpdateAccompanimentRequestAction,
  UpdateAccompanimentSuccessAction,
  UpdateAccompanimentFailureAction
} from './types'

export function loadAccompanimentsRequestAction(): LoadAccompanimentsRequestAction {
  return {
    type: Types.LOAD_ACCOMPANIMENTS_REQUEST
  }
}

export function loadAccompanimentsFailureAction(
  message: string
): LoadAccompanimentsFailureAction {
  return {
    propagate: true,
    type: Types.LOAD_ACCOMPANIMENTS_FAILURE,
    payload: { message }
  }
}

export function loadAccompanimentsSuccessAction(
  accompaniments: Accompaniment[]
): LoadAccompanimentsSuccessAction {
  return {
    propagate: true,
    type: Types.LOAD_ACCOMPANIMENTS_SUCCESS,
    payload: { accompaniments }
  }
}

export function updateAccompanimentRequestAction(
  id: string,
  accompaniment: Accompaniment
): UpdateAccompanimentRequestAction {
  return {
    type: Types.UPDATE_ACCOMPANIMENT_REQUEST,
    payload: { id, accompaniment }
  }
}

export function updateAccompanimentSuccessAction(
  accompaniment: Accompaniment
): UpdateAccompanimentSuccessAction {
  return {
    propagate: true,
    type: Types.UPDATE_ACCOMPANIMENT_SUCCESS,
    payload: { accompaniment }
  }
}

export function updateAccompanimentFailureAction(
  message: string
): UpdateAccompanimentFailureAction {
  return {
    type: Types.UPDATE_ACCOMPANIMENT_FAILURE,
    payload: { message }
  }
}

export function markAccompanimentAsSendRequestAction(
  id: string
): MarkAccompanimentAsSendRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_SENDED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsSendSuccessAction(
  accompaniment: Accompaniment
): MarkAccompanimentAsSendSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsSendFailureAction(
  message: string
): MarkAccompanimentAsSendFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_SENDED_FAILURE,
    payload: { message }
  }
}

export function markAccompanimentAsReviewedRequestAction(
  id: string
): MarkAccompanimentAsReviewedRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_REVIEWED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsReviewedSuccessAction(
  accompaniment: Accompaniment
): MarkAccompanimentAsReviewedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsReviewedFailureAction(
  message: string
): MarkAccompanimentAsReviewedFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_REVIEWED_FAILURE,
    payload: { message }
  }
}

export function markAccompanimentAsReleasedRequestAction(
  id: string
): MarkAccompanimentAsReleadedRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_RELEASED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsReleasedSuccessAction(
  accompaniment: Accompaniment
): MarkAccompanimentAsReleadedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsReleasedFailureAction(
  message: string
): MarkAccompanimentAsReleadedFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_RELEASED_FAILURE,
    payload: { message }
  }
}