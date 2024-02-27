import type { Client } from './client'
import type { Movie } from './movie'
import type { User } from './user'

export interface Rental {
  id: string
  client: Client
  movies: Movie[]
  rentalDate: number
  returnDate: number
  locatedBy: User
  status: RentalStatus
}

export type RentalStatus = 'rented' | 'returned'
