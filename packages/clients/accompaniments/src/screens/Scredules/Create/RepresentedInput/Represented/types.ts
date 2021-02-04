import { IProvider } from '@shared/web-components'

export interface IRepresentedProvider extends IProvider {
  fantasy: string
  representative: {
    name: string
  }
}

export interface IRepresentedProps {
  data: IRepresentedProvider
}
