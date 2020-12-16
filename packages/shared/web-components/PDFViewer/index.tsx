import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { Button } from '@shared/web-components'

import { Wrapper, Container, Title } from './styles'
import { Props } from './types'

const PDFViewer: React.FC<Props> = ({
  name,
  url,
  width = 700,
  height = 600
}) => {
  const [saving, setSaving] = useState(false)
  const [printing, setPrinting] = useState(false)

  const handlePrint = useCallback(() => {
    ipcRenderer.send('print-request', url)

    setPrinting(true)
  }, [url])

  const handleSave = useCallback(() => {
    ipcRenderer.send('save-request', name, url)

    setSaving(true)
  }, [name, url])

  useEffect(() => {
    const printListener = (_: IpcRendererEvent, success: boolean) => {
      if (success) {
        toast.success('O PDF foi enviado para sua impressora padrão')
      } else {
        toast.error('Ocorreu um erro ao tentar imprimir este PDF')
      }

      setPrinting(false)
    }

    const saveListener = (
      _: IpcRendererEvent,
      result: 'saved' | 'failed' | 'canceled'
    ) => {
      if (result === 'saved') {
        toast.success('O PDF foi salvo com sucesso')
      } else if (result === 'failed') {
        toast.error('Ocorreu um erro ao tentar salvar este PDF')
      }

      setSaving(false)
    }

    ipcRenderer
      .on('print-result', printListener)
      .on('save-result', saveListener)

    return () => {
      ipcRenderer
        .removeListener('print-result', printListener)
        .removeListener('save-result', saveListener)
    }
  }, [])

  return (
    <Wrapper>
      <object data={url} type="application/pdf" height={height} width={width}>
        <embed src={url} type="application/pdf" />
      </object>

      <Container>
        <Title>{name}</Title>

        <Button
          secondary
          label="Salvar"
          loading={saving}
          onClick={handleSave}
        />

        <Button
          secondary
          label="Imprimir"
          loading={printing}
          onClick={handlePrint}
        />
      </Container>
    </Wrapper>
  )
}

export { PDFViewer }
