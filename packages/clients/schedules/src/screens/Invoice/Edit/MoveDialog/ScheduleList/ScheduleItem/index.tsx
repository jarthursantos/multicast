import React from 'react'

import { IProvider } from '~/../../../shared/web-components'

import { Container, ShippingNameLabel } from './styles'
import { IScheduleListItemProps } from './types'

const ScheduleListItem: React.VFC<IScheduleListItemProps> = ({
  data,
  onClick,
  selected
}) => {
  return (
    <Container className={selected ? 'selected' : ''} onClick={onClick}>
      <ShippingNameLabel>{data.shippingName}</ShippingNameLabel>

      <ul>
        {data.invoices && data.invoices.length !== 0 ? (
          data.invoices
            .reduce<IProvider[]>((list, { provider }) => {
              const alreadyAdded = list.find(
                ({ code }) => code === provider.code
              )

              if (!alreadyAdded) {
                list.push(provider)
              }

              return list
            }, [])
            .sort(
              (provider, otherProvider) => provider.code - otherProvider.code
            )
            .map(providers => (
              <li key={providers.code}>
                <div className="number">{providers.code}</div>

                <div>{providers.name}</div>
              </li>
            ))
        ) : (
          <li>Nenhuma nota nesse agendamento</li>
        )}
      </ul>
    </Container>
  )
}

export { ScheduleListItem }
