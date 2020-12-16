import React, { useMemo, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useField } from '@unform/core'
import styled from 'styled-components'

interface Props {
  name: string
  label: string
  accept: string
}

const FileInput: React.FC<Props> = ({ name, label, accept }) => {
  const { fieldName, registerField } = useField(name)

  const [file, setFile] = useState<File>()

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept
  } = useDropzone({
    accept,
    onDropAccepted(droppedFiles: File[]) {
      setFile(droppedFiles[0])
    }
  })

  const containerClassName = useMemo(() => {
    if (isDragAccept) return 'accept'
    if (isDragReject) return 'reject'

    return ''
  }, [isDragAccept, isDragReject])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => file,
      setValue: (value: File) => setFile(value),
      clearValue: () => setFile(undefined)
    })
  }, [fieldName, registerField, file])

  return (
    <Container>
      <label>{label}</label>

      <DropContainer {...getRootProps()} className={containerClassName}>
        <input {...getInputProps()} multiple={false} />

        <FileName>
          {isDragAccept
            ? 'Arquivo válido'
            : isDragReject
            ? 'Arquivo inválido'
            : file?.name || 'Nenhum arquivo selecionado'}
        </FileName>
        <Message>Clique ou arraste o arquivo aqui</Message>
      </DropContainer>
    </Container>
  )
}

const Container = styled.div`
  label {
    color: #666;
    font-size: 13px;
  }

  & > label + * {
    margin-top: 8px;
  }
`

const DropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
  border: 2px solid #ddd;
  border-radius: 4px;
  padding: 12px;

  color: #666;
  transition: all 0.2s;

  &.accept {
    color: #2ab84b;
    border-color: #2ab84b;
  }

  &.reject {
    color: #de3b3b;
    border-color: #de3b3b;
  }
`

const FileName = styled.strong`
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  max-width: 190px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Message = styled.p`
  text-align: center;
  font-size: 12px;
  margin-top: 4px;
`

export { FileInput }
