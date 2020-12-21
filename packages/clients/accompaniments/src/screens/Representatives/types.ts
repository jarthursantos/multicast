export interface Representative {
  name: string
  email: string
  phone: string
  provider: Provider
}

export interface Buyer {
  code: number
  name: string
}

export interface Provider {
  code: number
  name: string
  fantasy: string
  principalCode: number
  cnpj: string
  city: string
  state: string
  deliveryTime: number

  buyer: Buyer
}

export type RepresentedRepresentativeGroup = Representative & {
  representatives: Representative[]
}

export type BuyerRepresentativeGroup = Buyer & {
  representatives: Representative[]
}

export interface RepresentativesPageProps {
  currentPage: string
}

export interface RepresentativesContextHandles {
  representatives: Representative[]
}
