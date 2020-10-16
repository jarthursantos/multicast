import React, { useState, useEffect } from 'react'
import Loading from 'react-loading'
import { toast } from 'react-toastify'

import { extractErrorMessage, useAxios } from '@shared/axios'
import { DataGrid, Form, SelectInput } from '@shared/web-components'

import { columns } from './columns'
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
  accompanimentId
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Product[]>([])
  const [currWidth, setCurrWidth] = useState(300)

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
      onResize={(_, d) => setCurrWidth(d.size.width)}
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

        <DataGrid<Product>
          data={data}
          keyExtractor={product => product.code}
          columns={columns.map((col, i) => {
            if (i === 1) {
              return {
                ...col,
                header: { ...col.header, width: currWidth - 149 }
              }
            }

            return col
          })}
          resolveRowStyle={() => ({})}
          style={{ style: { gridArea: 'CONTENT' } }}
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

export default ProductsContainer
