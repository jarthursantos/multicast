import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

import { format } from 'date-fns'

import { useAxios, extractErrorMessage } from '@shared/axios'
import { formatPriceWithoutSymbol } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'
import { Form, TextInput, NumberInput } from '@shared/web-components/Form'

import { normalizeDate } from '../Scredules/context'
import { Wrapper, ChartWrapper, Inline, InlineFlexRight } from './styles'
import { ProductDetailsScreenProps, PriceHistory } from './types'

function buildData(labels: string[], values: number[]) {
  return {
    labels,
    datasets: [
      {
        label: 'Preço de Compra',
        backgroundColor: 'rgba(51, 51, 51, 0.2)',
        borderColor: 'rgba(51, 51, 51, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(51, 51, 51, 0.4)',
        hoverBorderColor: 'rgba(51, 51, 51, 1)',
        data: values
      }
    ]
  }
}

function buildOptions() {
  return {
    maintainAspectRatio: false,

    scales: {
      yAxes: [
        {
          ticks: {
            // beginAtZero: true,
            // min: 3.5,
            // max: 6,
            callback: function (value: number) {
              return 'R$ ' + formatPriceWithoutSymbol(value)
            }
          }
        }
      ]
    }
  }
}

const ProductDetailsScreen: React.VFC<ProductDetailsScreenProps> = ({
  product
}) => {
  const [api, haveToken] = useAxios()

  const [labels, setLabels] = useState<string[]>([])
  const [values, setValues] = useState<number[]>([])
  const [isLoadingPriceHistory, setLoadingPriceHistory] = useState(false)

  useEffect(() => {
    async function loadPriceHistory() {
      setLoadingPriceHistory(true)

      try {
        const { data } = await api.get<PriceHistory[]>(
          `/products/${product.code}/priceHistory`
        )

        setLabels(
          data.map(({ entryAt }) =>
            format(normalizeDate(entryAt), 'dd/MM/yyyy')
          )
        )

        setValues(data.map(({ price }) => parseFloat(price.toFixed(2))))
      } catch (error) {
        const message = extractErrorMessage(error)

        console.log(String(message))
      } finally {
        setLoadingPriceHistory(false)
      }
    }

    if (haveToken && product) {
      loadPriceHistory()
    }
  }, [api, product, haveToken])

  return (
    <Wrapper>
      <Form onSubmit={console.log} initialData={product}>
        <InlineFlexRight>
          <NumberInput
            name="code"
            label="Código Interno"
            inputProps={{ readOnly: true }}
          />

          <TextInput
            name="factoryCode"
            label="Código de Fábrica"
            inputProps={{ readOnly: true }}
          />
        </InlineFlexRight>

        <TextInput
          name="description"
          label="Descrição"
          inputProps={{ readOnly: true }}
        />

        <Inline>
          <TextInput
            name="packing"
            label="Embalagem"
            inputProps={{ readOnly: true }}
          />

          <TextInput
            name="unity"
            label="Unidade"
            inputProps={{ readOnly: true }}
          />
        </Inline>
        <Inline>
          <NumberInput
            name="price"
            label="Preço Atual"
            inputProps={{ readOnly: true }}
          />
          <NumberInput
            name="price"
            label="Preço Anterior"
            inputProps={{ readOnly: true }}
          />
        </Inline>
      </Form>

      <ChartWrapper>
        <Line data={buildData(labels, values)} options={buildOptions()} />
      </ChartWrapper>
    </Wrapper>
  )
}

export { ProductDetailsScreen }
