import produce from 'immer'

import { AccompanimentsActionTypes, AccompanimentsState, Types } from './types'

const INITIAL_STATE: AccompanimentsState = {
  accompaniments: [],

  loadingCanceledAccompaniments: false,
  canceledAccompaniments: [],

  loadingCompletedAccompaniments: false,
  completedAccompaniments: [],

  loading: false,

  updatingAccompaniment: false,
  additingAnnotation: false,
  renewingAccompaniment: false,
  cancelingAccompaniment: false,

  markingAsSended: false,
  markingAsReviewed: false,
  markingAsReleased: false,
  markingAsFinished: false,

  includeCanceledAccompaniments: false,
  includeCompletedAccompaniments: false,

  filters: {}
}

export default function accompaniments(
  state = INITIAL_STATE,
  action: AccompanimentsActionTypes
) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.LOAD_ACCOMPANIMENTS_SUCCESS: {
        draft.accompaniments = action.payload.accompaniments
        draft.loading = false

        break
      }
      case Types.LOAD_ACCOMPANIMENTS_FAILURE: {
        draft.loading = false

        break
      }
      case Types.LOAD_ACCOMPANIMENTS_REQUEST: {
        draft.loading = true

        break
      }

      case Types.UPDATE_ACCOMPANIMENT_SUCCESS: {
        const { accompaniment } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === accompaniment.id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments[accompanimentIndex] = accompaniment
        }

        draft.updatingAccompaniment = false

        break
      }
      case Types.UPDATE_ACCOMPANIMENT_FAILURE: {
        draft.updatingAccompaniment = false

        break
      }
      case Types.UPDATE_ACCOMPANIMENT_REQUEST: {
        draft.updatingAccompaniment = true

        break
      }

      case Types.RENEW_ACCOMPANIMENT_SUCCESS: {
        const { accompaniment, renewedAccompaniment } = action.payload

        draft.accompaniments.push(renewedAccompaniment)

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === accompaniment.id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments[accompanimentIndex] = accompaniment
        }

        draft.updatingAccompaniment = false

        break
      }
      case Types.RENEW_ACCOMPANIMENT_FAILURE: {
        draft.updatingAccompaniment = false

        break
      }
      case Types.RENEW_ACCOMPANIMENT_REQUEST: {
        draft.updatingAccompaniment = true

        break
      }

      case Types.CANCEL_ACCOMPANIMENT_SUCCESS: {
        const { id } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments.splice(accompanimentIndex, 1)
        }

        draft.cancelingAccompaniment = false

        break
      }
      case Types.CANCEL_ACCOMPANIMENT_FAILURE: {
        draft.cancelingAccompaniment = false

        break
      }
      case Types.CANCEL_ACCOMPANIMENT_REQUEST: {
        draft.cancelingAccompaniment = true

        break
      }

      case Types.ADD_ANNOTATION_SUCCESS: {
        const { id, annotation } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments[accompanimentIndex].annotations.push(annotation)
          draft.accompaniments[accompanimentIndex].delay = 0
        }

        draft.additingAnnotation = false

        break
      }
      case Types.ADD_ANNOTATION_FAILURE: {
        draft.additingAnnotation = false

        break
      }
      case Types.ADD_ANNOTATION_REQUEST: {
        draft.additingAnnotation = true

        break
      }

      case Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS: {
        const { accompaniment } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === accompaniment.id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments[accompanimentIndex] = accompaniment
        }

        draft.markingAsSended = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_SENDED_FAILURE: {
        draft.markingAsSended = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_SENDED_REQUEST: {
        draft.markingAsSended = true
        break
      }

      case Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS: {
        const { accompaniment } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === accompaniment.id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments[accompanimentIndex] = accompaniment
        }

        draft.markingAsReviewed = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_REVIEWED_FAILURE: {
        draft.markingAsReviewed = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_REVIEWED_REQUEST: {
        draft.markingAsReviewed = true
        break
      }

      case Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS: {
        const { accompaniment } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === accompaniment.id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments[accompanimentIndex] = accompaniment
        }

        draft.markingAsReleased = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_RELEASED_FAILURE: {
        draft.markingAsReleased = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_RELEASED_REQUEST: {
        draft.markingAsReleased = true
        break
      }

      case Types.MARK_ACCOMPANIMENT_FINISHED_SUCCESS: {
        const { accompaniment } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === accompaniment.id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments.splice(accompanimentIndex, 1)
        }

        draft.markingAsFinished = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_FINISHED_FAILURE: {
        draft.markingAsFinished = false
        break
      }
      case Types.MARK_ACCOMPANIMENT_FINISHED_REQUEST: {
        draft.markingAsFinished = true
        break
      }

      case Types.APPLY_ACCOMPANIMENTS_FILTERS: {
        const { filter } = action.payload

        draft.filters = filter

        break
      }

      case Types.CLEAR_ACCOMPANIMENTS_FILTERS: {
        draft.filters = {}

        break
      }

      case Types.LOAD_CANCELED_ACCOMPANIMENTS_SUCCESS: {
        draft.canceledAccompaniments = action.payload.accompaniments
        draft.loadingCanceledAccompaniments = false

        break
      }
      case Types.LOAD_CANCELED_ACCOMPANIMENTS_FAILURE: {
        draft.loadingCanceledAccompaniments = false

        break
      }
      case Types.LOAD_CANCELED_ACCOMPANIMENTS_REQUEST: {
        draft.loadingCanceledAccompaniments = true

        break
      }

      case Types.INCLUDE_CANCELED_ACCOMPANIMENTS: {
        draft.includeCanceledAccompaniments = true

        break
      }

      case Types.CLEAR_CANCELED_ACCOMPANIMENTS: {
        draft.canceledAccompaniments = []
        draft.includeCanceledAccompaniments = false
        draft.loadingCanceledAccompaniments = false

        break
      }

      case Types.LOAD_COMPLETED_ACCOMPANIMENTS_SUCCESS: {
        draft.completedAccompaniments = action.payload.accompaniments
        draft.loadingCompletedAccompaniments = false

        break
      }
      case Types.LOAD_COMPLETED_ACCOMPANIMENTS_FAILURE: {
        draft.loadingCompletedAccompaniments = false

        break
      }
      case Types.LOAD_COMPLETED_ACCOMPANIMENTS_REQUEST: {
        draft.loadingCompletedAccompaniments = true

        break
      }

      case Types.INCLUDE_COMPLETED_ACCOMPANIMENTS: {
        draft.includeCompletedAccompaniments = true

        break
      }

      case Types.CLEAR_COMPLETED_ACCOMPANIMENTS: {
        draft.completedAccompaniments = []
        draft.includeCompletedAccompaniments = false
        draft.loadingCompletedAccompaniments = false

        break
      }

      default:
    }
  })
}
