import {
  Accompaniment,
  Types,
  LoadAccompanimentsSuccessAction,
  LoadAccompanimentsFailureAction,
  LoadAccompanimentsRequestAction,
  AddAnnotationRequestAction,
  AddAnnotationSuccessAction,
  AddAnnotationFailureAction,
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
  UpdateAccompanimentFailureAction,
  AnnotationContent,
  Annotation,
  RenewAccompanimentFailureAction,
  RenewAccompanimentSuccessAction,
  RenewAccompanimentRequestAction,
  CancelAccompanimentFailureAction,
  CancelAccompanimentRequestAction,
  CancelAccompanimentSuccessAction,
  FilterAccompanimentRequestAction,
  AccompanimentFilters,
  ClearFilterAccompanimentRequestAction
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

export function markAccompanimentAsSendRequest(
  id: string
): MarkAccompanimentAsSendRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_SENDED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsSendSuccess(
  accompaniment: Accompaniment
): MarkAccompanimentAsSendSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsSendFailure(
  message: string
): MarkAccompanimentAsSendFailureAction {
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
): MarkAccompanimentAsReleadedRequestAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_RELEASED_REQUEST,
    payload: { id }
  }
}

export function markAccompanimentAsReleasedSuccess(
  accompaniment: Accompaniment
): MarkAccompanimentAsReleadedSuccessAction {
  return {
    propagate: true,
    type: Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS,
    payload: { accompaniment }
  }
}

export function markAccompanimentAsReleasedFailure(
  message: string
): MarkAccompanimentAsReleadedFailureAction {
  return {
    type: Types.MARK_ACCOMPANIMENT_RELEASED_FAILURE,
    payload: { message }
  }
}

export function filterAccompanimentRequest(
  filter: AccompanimentFilters
): FilterAccompanimentRequestAction {
  return {
    type: Types.FILTER_ACCOMPANIMENT_REQUEST,
    payload: { filter }
  }
}

export function clearFilterAccompanimentRequest(): ClearFilterAccompanimentRequestAction {
  return {
    type: Types.CLEAR_FILTER_ACCOMPANIMENT_REQUEST
  }
}
