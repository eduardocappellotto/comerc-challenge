import type { Movie } from './movie'

export interface Rental {
  id: number
  clientId: number
  movies: Movie[]
  rentalDate: string
  returnDate: string
  userId: number
  status: RentalStatus
}

type RentalStatus = 'rented' | 'returned'
