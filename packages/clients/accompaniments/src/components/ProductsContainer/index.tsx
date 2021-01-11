import React, { useState, useEffect } from 'react'
import Loading from 'react-loading'
import { toast } from 'react-toastify'

import { extractErrorMessage, useAxios } from '@shared/axios'
import { Form, SelectInput } from '@shared/web-components'
import { Table } from '@shared/web-components/Table'

import { Wrapper, Header, Container, LoadingWrapper } from './styles'
import { ProductsContainerProps } from './types'

interface Product {
  code: string
  provider: string
}

interface Option {
  value: string
  label: string
}

const ProductsContainer: React.VFC<ProductsContainerProps> = ({
  accompanimentId,
  onResize
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Product[]>([])

  const [value, onChange] = useState<Option>({ value: 'all', label: 'Todos' })

  const [api] = useAxios()

  useEffect(() => {
    setData([])

    if (!accompanimentId) return

    async function loadProducts() {
      setLoading(true)

      try {
        const products = await api.get<Product[]>(
          `accompaniments/${accompanimentId}/products`,
          { params: value.value !== 'all' ? { only: value.value } : {} }
        )

        setData(products.data)
      } catch (error) {
        const message = extractErrorMessage(error)

        toast.error(message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [accompanimentId, api, value])

  return (
    <Wrapper
      width={300}
      height={Infinity}
      handleSize={[10, 100]}
      minConstraints={[250, Infinity]}
      maxConstraints={[500, Infinity]}
      onResize={(_, data) => onResize(data.size.width)}
    >
      <Container>
        <Header>
          <Form onSubmit={console.log}>
            <SelectInput
              name="option"
              label="Exibir Produtos"
              inputProps={{
                value,
                onChange,
                options: [
                  { value: 'all', label: 'Todos' },
                  { value: 'delivered', label: 'Entregues' },
                  { value: 'pending', label: 'Pendentes' }
                  // { value: 'invoice', label: 'Nota Fiscal' }
                ]
              }}
            />
          </Form>
        </Header>

        <Table
          dataKey="code"
          style={{ gridArea: 'CONTENT', width: '100%', height: '100%' }}
          options={{
            data,
            layout: 'fitColumns',
            resizableColumns: false,
            columns: [
              {
                title: 'Código',
                field: 'code',
                sorter: 'number',
                headerHozAlign: 'center',
                hozAlign: 'right',
                width: 80,
                bottomCalc: 'count',
                headerSort: false
              },
              {
                title: 'Descrição',
                field: 'description',
                sorter: 'string',
                widthGrow: 1,
                widthShrink: 1,
                headerSort: false
              },
              {
                title: 'Qtd',
                field: 'requestedQuantity',
                sorter: 'number',
                hozAlign: 'right',
                headerHozAlign: 'center',
                width: 60,
                bottomCalc: 'count',
                headerSort: false
              }
            ]
          }}
        />

        {loading && (
          <LoadingWrapper>
            <Loading type="spin" width={32} height={32} color="#333" />
          </LoadingWrapper>
        )}
      </Container>
    </Wrapper>
  )
}

export { ProductsContainer }
