import React, { useCallback, useState } from 'react'

import { remote } from 'electron'
import { useFormValidatorRef } from 'hookable-unform'

import { extractErrorMessage, useAxios } from '@shared/axios'
import { DateInput, SubmitButton, PDFViewer } from '@shared/web-components'

import { IFile } from '~/store/modules/schedules/types'

import { schema } from './schema'
import { Layout, FormWrapper, ReportWrapper } from './styles'

const DischargeValueReport: React.VFC = () => {
  const [formRef, validateForm] = useFormValidatorRef(schema)

  const [generating, setGenerating] = useState(false)
  const [report, setReport] = useState<IFile>()

  const [api] = useAxios()

  const handleSubmit = useCallback(
    async (period: any) => {
      setGenerating(true)

      try {
        const { success } = await validateForm()

        if (success) {
          formRef.current?.setErrors({})

          const { data } = await api.get<IFile>('/schedules/reports/cost', {
            params: period
          })

          if (data) {
            setReport(data)
          }
        }
      } catch (error) {
        const message = extractErrorMessage(error)

        remote?.dialog.showErrorBox(
          'Erro ao gerar relatório de custos',
          String(message)
        )
      } finally {
        setGenerating(false)
      }
    },
    [validateForm, api]
  )

  return (
    <Layout>
      <FormWrapper onSubmit={handleSubmit} ref={formRef}>
        <DateInput name="periodStart" label="Inicio do Período" />
        <DateInput name="periodEnd" label="Fim do Período" />

        <SubmitButton label="Gerar" loading={generating} />
      </FormWrapper>

      <ReportWrapper>
        {report && (
          <PDFViewer
            name={report.filename}
            url={report.url}
            width="100%"
            height="100%"
          />
        )}
      </ReportWrapper>
    </Layout>
  )
}

export { DischargeValueReport }
