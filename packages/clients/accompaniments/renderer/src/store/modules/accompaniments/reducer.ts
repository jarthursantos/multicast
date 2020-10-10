import produce from 'immer'

import { AccompanimentsActionTypes, AccompanimentsState, Types } from './types'

const INITIAL_STATE: AccompanimentsState = {
  accompaniments: [],

  loading: false,

  updatingAccompaniment: false,
  additingAnnotation: false,
  renewingAccompaniment: false,

  markingAsSended: false,
  markingAsReviewed: false,
  markingAsReleased: false
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

      case Types.ADD_ANNOTATION_SUCCESS: {
        const { id, annotation } = action.payload

        const accompanimentIndex = draft.accompaniments.findIndex(
          current => current.id === id
        )

        if (accompanimentIndex !== -1) {
          draft.accompaniments[accompanimentIndex].annotations.push(annotation)
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

      default:
    }
  })
}
