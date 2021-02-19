import { Product } from '~/windows/ProductDetails/types'

export interface PriceHistory {
  entryAt: Date | string
  price: number
}

export interface ProductDetailsScreenProps {
  product: Product
}
