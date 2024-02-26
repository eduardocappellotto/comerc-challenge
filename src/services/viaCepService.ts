import axios, { type AxiosResponse } from 'axios'
import type { Address } from '@/types/address'

interface ViaCepResponseAddress {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

class ViaCepService {
  async getAddress(zipCode: string): Promise<Address | null> {
    try {
      const response: AxiosResponse<ViaCepResponseAddress> = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json`
      )
      return {
        zipcode: zipCode,
        street: response.data.logradouro,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf
      }
    } catch (error) {
      console.error('Error fetching address:', error)
      return null
    }
  }
}

export default new ViaCepService()
