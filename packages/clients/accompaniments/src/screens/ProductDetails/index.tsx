import React from 'react'
import { Line } from 'react-chartjs-2'

import { formatPriceWithoutSymbol } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'
import { Form, TextInput, NumberInput } from '@shared/web-components/Form'

import { Wrapper, ChartWrapper, Inline, InlineFlexRight } from './styles'
import { ProductDetailsScreenProps } from './types'

const ProductDetailsScreen: React.VFC<ProductDetailsScreenProps> = ({
  product
}) => {
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
        <Line
          data={data}
          options={{
            maintainAspectRatio: false,

            scales: {
              yAxes: [
                {
                  ticks: {
                    // beginAtZero: true,
                    min: 3.5,
                    max: 6,
                    callback: function (value: number) {
                      return 'R$ ' + formatPriceWithoutSymbol(value)
                    }
                  }
                }
              ]
            }
          }}
        />
      </ChartWrapper>
    </Wrapper>
  )
}

const data = {
  labels: [
    'Jan, 2020',
    'Set, 2020',
    'Out, 2020',
    'Nov, 2020',
    'Dez, 2020',
    'Jan, 2021',
    'Fev, 2021'
  ],
  datasets: [
    {
      label: 'Preço de Compra',
      backgroundColor: 'rgba(51, 51, 51, 0.2)',
      borderColor: 'rgba(51, 51, 51, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(51, 51, 51, 0.4)',
      hoverBorderColor: 'rgba(51, 51, 51, 1)',
      data: [5.5, 5.6, 5.7, 5.4, 5.6, 5.5, 4.0]
    }
  ]
}

export { ProductDetailsScreen }
