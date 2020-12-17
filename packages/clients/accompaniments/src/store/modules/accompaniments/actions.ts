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
  data: Accompaniment
): UpdateAccompanimentRequestAction {
  return {
    type: Types.UPDATE_ACCOMPANIMENT_REQUEST,
    payload: { id, data }
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

export function renewAccompanimentRequestAction(
  id: string
): RenewAccompanimentRequestAction {
  return {
    type: Types.RENEW_ACCOMPANIMENT_REQUEST,
    payload: { id }
  }
}

export function renewAccompanimentSuccessAction(
  accompaniment: Accompaniment,
  renewedAccompaniment: Accompaniment
): RenewAccompanimentSuccessAction {
  return {
    propagate: true,
    type: Types.RENEW_ACCOMPANIMENT_SUCCESS,
    payload: { accompaniment, renewedAccompaniment }
  }
}

export function renewAccompanimentFailureAction(
  message: string
): RenewAccompanimentFailureAction {
  return {
    type: Types.RENEW_ACCOMPANIMENT_FAILURE,
    payload: { message }
  }
}

export function cancelAccompanimentRequestAction(
  id: string,
  motive: string
): CancelAccompanimentRequestAction {
  return {
    type: Types.CANCEL_ACCOMPANIMENT_REQUEST,
    payload: { id, motive }
  }
}

export function cancelAccompanimentSuccessAction(
  id: string
): CancelAccompanimentSuccessAction {
  return {
    propagate: true,
    type: Types.CANCEL_ACCOMPANIMENT_SUCCESS,
    payload: { id }
  }
}

export function cancelAccompanimentFailureAction(
  message: string
): CancelAccompanimentFailureAction {
  return {
    type: Types.CANCEL_ACCOMPANIMENT_FAILURE,
    payload: { message }
  }
}

export function addAnnotationRequestAction(
  id: string,
  data: AnnotationContent
): AddAnnotationRequestAction {
  return {
    type: Types.ADD_ANNOTATION_REQUEST,
    payload: { id, data }
  }
}

export function addAnnotationSuccessAction(
  id: string,
  annotation: Annotation
): AddAnnotationSuccessAction {
  return {
    propagate: true,
    type: Types.ADD_ANNOTATION_SUCCESS,
    payload: { id, annotation }
  }
}

export function addAnnotationFailureAction(
  message: string
): AddAnnotationFailureAction {
  return {
    type: Types.ADD_ANNOTATION_FAILURE,
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

export function filterAccompanimentRequestAction(
  filter: AccompanimentFilters
): FilterAccompanimentRequestAction {
  return {
    type: Types.FILTER_ACCOMPANIMENT_REQUEST,
    payload: { filter }
  }
}

export function clearFilterAccompanimentRequestAction(): ClearFilterAccompanimentRequestAction {
  return {
    type: Types.CLEAR_FILTER_ACCOMPANIMENT_REQUEST
  }
}
