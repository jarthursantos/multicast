export interface Change<Type> {
  from?: Type
  to: Type
}

export interface ChargeEntity {
  code: string
  name: string
}
