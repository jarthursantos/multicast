import {
  Accompaniment,
  Types,
  LoadAccompanimentsSuccessAction,
  LoadAccompanimentsFailureAction,
  LoadAccompanimentsRequestAction,
  AddAnnotationRequestAction,
  AddAnnotationSuccessAction,
  AddAnnotationFailureAction,
  MarkAccompanimentAsSendedRequestAction,
  MarkAccompanimentAsReviewedRequestAction,
  MarkAccompanimentAsReleasedRequestAction,
  MarkAccompanimentAsSendedSuccessAction,
  MarkAccompanimentAsSendedFailureAction,
  MarkAccompanimentAsReleasedFailureAction,
  MarkAccompanimentAsReleasedSuccessAction,
  MarkAccompanimentAsReviewedSuccessAction,
  MarkAccompanimentAsReviewedFailureAction,
  MarkAccompanimentAsFinishedFailureAction,
  MarkAccompanimentAsFinishedRequestAction,
  MarkAccompanimentAsFinishedSuccessAction,
  UpdateAccompanimentRequestAction,
  UpdateAccompanimentSuccessAction,
  UpdateAccompanimentFailureAction,
  AnnotationContent,
  Annotation,
  RenewAccompanimentFailureAction,
  RenewAccompanimentSuccessAction,
  RenewAccompanimentRequestAction,
  CancelAccompanimentFailureAction,
  CancelAccompanimentRequestAction,
  CancelAccompanimentSuccessAction,
  ApplyAccompanimentFilterAction,
  IAccompanimentFilters,
  ClearAccompanimentFilterAction
} from './types'

export function loadAccompanimentsRequest(): LoadAccompanimentsRequestAction {
  return {
    type: Types.LOAD_ACCOMPANIMENTS_REQUEST
  }
}

export function loadAccompanimentsFailure(
  message: string
): LoadAccompanimentsFailureAction {
  return {
    propagate: true,
    type: Types.LOAD_ACCOMPANIMENTS_FAILURE,
    payload: { message }
  }
}

export function loadAccompanimentsSuccess(
  accompaniments: Accompaniment[]
): LoadAccompanimentsSuccessAction {
  return {
    propagate: true,
    type: Types.LOAD_ACCOMPANIMENTS_SUCCESS,
    payload: { accompaniments }
  }
}

export function updateAccompanimentRequest(
  id: string,
  data: Accompaniment
): UpdateAccompanimentRequestAction {
  return {
    type: Types.UPDATE_ACCOMPANIMENT_REQUEST,
    payload: { id, data }
  }
}

export function updateAccompanimentSuccess(
  accompaniment: Accompaniment
): UpdateAccompanimentSuccessAction {
  return {
    propagate: true,
    type: Types.UPDATE_ACCOMPANIMENT_SUCCESS,
    payload: { accompaniment }
  }
}

export function updateAccompanimentFailure(
  message: string
): UpdateAccompanimentFailureAction {
  return {
    type: Types.UPDATE_ACCOMPANIMENT_FAILURE,
    payload: { message }
  }
}

export function renewAccompanimentRequest(
  id: string
): RenewAccompanimentRequestAction {
  return {
    type: Types.RENEW_ACCOMPANIMENT_REQUEST,
    payload: { id }
  }
}

export function renewAccompanimentSuccess(
  accompaniment: Accompaniment,
  renewedAccompaniment: Accompaniment
): RenewAccompanimentSuccessAction {
  return {
    propagate: true,
    type: Types.RENEW_ACCOMPANIMENT_SUCCESS,
    payload: { accompaniment, renewedAccompaniment }
  }
}

export function renewAccompanimentFailure(
  message: string
): RenewAccompanimentFailureAction {
  return {
    type: Types.RENEW_ACCOMPANIMENT_FAILURE,
    payload: { message }
  }
}

export function cancelAccompanimentRequest(
  id: string,
  motive: string
): CancelAccompanimentRequestAction {
  return {
    type: Types.CANCEL_ACCOMPANIMENT_REQUEST,
    payload: { id, motive }
  }
}

export function cancelAccompanimentSuccess(
  id: string
): CancelAccompanimentSuccessAction {
  return {
    propagate: true,
    type: Types.CANCEL_ACCOMPANIMENT_SUCCESS,
    payload: { id }
  }
}

export function cancelAccompanimentFailure(
  message: string
): CancelAccompanimentFailureAction {
  return {
    type: Types.CANCEL_ACCOMPANIMENT_FAILURE,
    payload: { message }
  }
}

export function addAnnotationRequest(
  id: string,
  data: AnnotationContent
): AddAnnotationRequestAction {
  return {
    type: Types.ADD_ANNOTATION_REQUEST,
    payload: { id, data }
  }
}

export function addAnnotationSuccess(
  id: string,
  annotation: Annotation
): AddAnnotationSuccessAction {
  return {
    propagate: true,
    type: Types.ADD_ANNOTATION_SUCCESS,
    payload: { id, annotation }
  }
}

export function addAnnotationFailure(
  message: string
): AddAnnotationFailureAction {
  return {
    type: Types.ADD_ANNOTATION_FAILURE,
    payload: { message }
  }
}

export function markAccompanimentAsSendedRequest(
  id: string
): MarkAccompanimentAsSendedRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_SENDED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsSendedSuccess(
  accompaniment: Accompaniment
): MarkAccompanimentAsSendedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsSendedFailure(
  message: string
): MarkAccompanimentAsSendedFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_SENDED_FAILURE,
    payload: { message }
  }
}

export function markAccompanimentAsReviewedRequest(
  id: string
): MarkAccompanimentAsReviewedRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_REVIEWED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsReviewedSuccess(
  accompaniment: Accompaniment
): MarkAccompanimentAsReviewedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsReviewedFailure(
  message: string
): MarkAccompanimentAsReviewedFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_REVIEWED_FAILURE,
    payload: { message }
  }
}

export function markAccompanimentAsReleasedRequest(
  id: string
): MarkAccompanimentAsReleasedRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_RELEASED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsReleasedSuccess(
  accompaniment: Accompaniment
): MarkAccompanimentAsReleasedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsReleasedFailure(
  message: string
): MarkAccompanimentAsReleasedFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_RELEASED_FAILURE,
    payload: { message }
  }
}

export function markAccompanimentAsFinishedRequest(
  id: string
): MarkAccompanimentAsFinishedRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_FINISHED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsFinishedSuccess(
  accompaniment: Accompaniment
): MarkAccompanimentAsFinishedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_FINISHED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsFinishedFailure(
  message: string
): MarkAccompanimentAsFinishedFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_FINISHED_FAILURE,
    payload: { message }
  }
}

export function applyAccompanimentsFilters(
  filter: IAccompanimentFilters
): ApplyAccompanimentFilterAction {
  return {
    propagate: true,
    type: Types.APPLY_ACCOMPANIMENTS_FILTERS,
    payload: { filter }
  }
}

export function clearAccompanimentsFilters(): ClearAccompanimentFilterAction {
  return {
    propagate: true,
    type: Types.CLEAR_ACCOMPANIMENTS_FILTERS
  }
}
