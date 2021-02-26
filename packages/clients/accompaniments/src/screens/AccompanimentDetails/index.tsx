import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidator } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import {
  Form,
  ActionsContainer,
  FormHandles
} from '@shared/web-components/Form'

import AccompanimentData from '~/components/Forms/AccompanimentData'
import Observations from '~/components/Forms/Observations'
import RequestData from '~/components/Forms/RequestData'
import ScheduleData from '~/components/Forms/ScheduleData'
import { updateAccompanimentRequest } from '~/store/modules/accompaniments/actions'
import {
  Types,
  Accompaniment,
  MarkAccompanimentAsSendedSuccessAction,
  MarkAccompanimentAsReleasedSuccessAction,
  MarkAccompanimentAsReviewedSuccessAction,
  AddAnnotationSuccessAction
} from '~/store/modules/accompaniments/types'
import { closeWindow } from '~/utils/close-window'

import { Actions } from './Actions'
import { CancelDialog } from './CancelDialog'
import { ConfirmMailSendedDialog } from './ConfirmMailSended'
import { useChecks, useInvoices } from './hooks'
import { ReviewDialog } from './ReviewDialog'
import { schema } from './schema'
import { Wrapper, Container, RightPanel } from './styles'
import { AccompanimentDetailsScreenProps } from './types'

const AccompanimentDetailsScreen: React.VFC<AccompanimentDetailsScreenProps> = ({
  accompaniment: remoteAccompaniment
}) => {
  const dispatch = useDispatch()

  const formRef = useRef<FormHandles>(null)
  const validateForm = useFormValidator(formRef, schema)

  const [isCancelOpen, setCancelOpen] = useState(false)
  const [isReviewOpen, setReviewOpen] = useState(false)
  const [isConfirmMailOpen, setConfirmMailOpen] = useState(false)
  const [accompaniment, setAccompaniment] = useState<Accompaniment>(
    remoteAccompaniment
  )
  const invoices = useInvoices(accompaniment)

  const {
    sended,
    reviewed,
    released,
    scheduled,
    unlocked,
    finished
  } = useChecks(accompaniment)

  const openConfirmMail = useCallback(() => setConfirmMailOpen(true), [])
  const closeConfirmMail = useCallback(() => setConfirmMailOpen(false), [])

  const openCancel = useCallback(() => setCancelOpen(true), [])
  const closeCancel = useCallback(() => setCancelOpen(false), [])

  const openAccompanimentReview = useCallback(() => setReviewOpen(true), [])
  const closeAccompanimentReview = useCallback(() => setReviewOpen(false), [])

  const handleSubmit = useCallback(
    async (data: any) => {
      const { success } = await validateForm()

      if (success) {
        formRef.current?.setErrors({})

        dispatch(updateAccompanimentRequest(accompaniment.id, data))
      }
    },
    [dispatch, accompaniment, validateForm, formRef]
  )

  const handleSubmitForm = useCallback(() => formRef.current?.submitForm(), [
    formRef
  ])

  useEffect(
    () => remoteAccompaniment && setAccompaniment(remoteAccompaniment),
    [remoteAccompaniment]
  )

  useWatchAction<MarkAccompanimentAsSendedSuccessAction>(
    ({ payload }) => setAccompaniment(payload.accompaniment),
    Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS
  )

  useWatchAction<MarkAccompanimentAsReleasedSuccessAction>(
    ({ payload }) => setAccompaniment(payload.accompaniment),
    Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS
  )

  useWatchAction<MarkAccompanimentAsReviewedSuccessAction>(
    ({ payload }) => setAccompaniment(payload.accompaniment),
    Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS
  )

  useWatchAction<AddAnnotationSuccessAction>(
    ({ payload }) => {
      setAccompaniment(oldValue => ({
        ...oldValue,
        annotations: [...oldValue.annotations, payload.annotation]
      }))
    },
    [Types.ADD_ANNOTATION_SUCCESS]
  )

  useWatchAction(closeWindow, [
    Types.UPDATE_ACCOMPANIMENT_SUCCESS,
    Types.RENEW_ACCOMPANIMENT_SUCCESS,
    Types.CANCEL_ACCOMPANIMENT_SUCCESS,
    Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
    Types.MARK_ACCOMPANIMENT_REVIEWED_SUCCESS,
    Types.MARK_ACCOMPANIMENT_RELEASED_SUCCESS,
    Types.MARK_ACCOMPANIMENT_FINISHED_SUCCESS
  ])

  return (
    <>
      <Wrapper>
        <Container>
          <Form
            onSubmit={handleSubmit}
            initialData={accompaniment}
            ref={formRef}
          >
            <RequestData
              amountValue={accompaniment?.purchaseOrder.amountValue || 0}
              deliveredValue={accompaniment?.purchaseOrder.deliveredValue || 0}
            />

            <AccompanimentData
              options={invoices}
              disabled={!sended || !reviewed || !released || finished}
              isFreeOnBoard={accompaniment?.purchaseOrder.freight === 'FOB'}
            />
          </Form>

          <RightPanel>
            <Form onSubmit={console.log} initialData={accompaniment}>
              <ScheduleData />
            </Form>

            <Observations
              accompanimentId={accompaniment?.id}
              observations={accompaniment?.annotations || []}
            />
          </RightPanel>
        </Container>

        <ActionsContainer>
          <Actions
            accompaniment={accompaniment}
            openCancel={openCancel}
            openConfirmMail={openConfirmMail}
            openAccompanimentReview={openAccompanimentReview}
            sended={sended}
            reviewed={reviewed}
            released={released}
            scheduled={scheduled}
            unlocked={unlocked}
            finished={finished}
            submitForm={handleSubmitForm}
          />
        </ActionsContainer>
      </Wrapper>

      <ConfirmMailSendedDialog
        accompaniment={accompaniment}
        isOpen={isConfirmMailOpen}
        onClose={closeConfirmMail}
      />

      <CancelDialog
        isOpen={isCancelOpen}
        onClose={closeCancel}
        accompanimentId={accompaniment?.id}
      />

      <ReviewDialog
        isOpen={isReviewOpen}
        onClose={closeAccompanimentReview}
        accompanimentId={accompaniment?.id}
      />
    </>
  )
}

export { AccompanimentDetailsScreen }
