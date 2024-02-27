import type { Address } from './address'

export interface Client {
  id: string
  name: string
  surname: string
  cpf: string
  contacts: ContactInfo
  address: Address
  deleted?: boolean
}

export interface ContactInfo {
  email: string
  phone: string
}

export interface UserLogin {
  username: string
  password: string
}
