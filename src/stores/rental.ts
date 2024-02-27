import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type Rental, type RentalStatus } from '@/types/rental'

const rentals = ref<Rental[]>([])

export const useRentalStore = defineStore('rental', () => {
  const storedClientsJSON = localStorage.getItem('rentals')
  if (storedClientsJSON) {
    try {
      const parsedClients = JSON.parse(storedClientsJSON)
      rentals.value = parsedClients
    } catch (error) {
      throw new Error('Error parsing stored clients data:' + error)
    }
  }

  const getRentals = computed(() => rentals.value.filter((rental) => rental.status !== 'returned'))

  const getRentalById = (id: string) => rentals.value.find((rental) => rental.id === id)

  const getActiveRentalsByClientId = (clientId: string) =>
    rentals.value.filter((rental) => rental.client.id === clientId && rental.status === 'rented')

  const getRentalsByClientId = (clientId: string) =>
    rentals.value.filter((rental) => rental.client.id === clientId)

  const getRentalsByStatus = (status: Rental['status']) =>
    rentals.value.filter((rental) => rental.status === status)

  const getRentalsList = (
    clientId: string | null,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    let filteredRentals = rentals.value

    if (clientId) {
      filteredRentals = filteredRentals.filter((rental) => rental.client.id === clientId)
    }

    if (startDate && endDate) {
      filteredRentals = filteredRentals.filter(
        (rental) =>
          new Date(rental.rentalDate) >= startDate && new Date(rental.returnDate) <= endDate
      )
    }

    return filteredRentals
  }

  const addRental = (rental: Rental) => {
    const clientRentals = getActiveRentalsByClientId(rental.client.id)

    if (clientRentals.length > 0) {
      throw new Error('Cliente já possui uma locação')
    }

    rentals.value.push(rental)
    saveRentalToLocalStorage()
  }

  const updateRental = (updatedRental: Rental) => {
    const index = rentals.value.findIndex((rental) => rental.id === updatedRental.id)
    if (index !== -1) {
      rentals.value[index] = { ...rentals.value[index], ...updatedRental }
      saveRentalToLocalStorage()
    }
  }

  const changeRentalStatus = (rentalId: Rental['id']) => {
    const index = rentals.value.findIndex((rental) => rental.id === rentalId)

    let newStatus: RentalStatus = 'returned'
    if (rentals.value[index].status === 'rented') newStatus = 'returned'
    if (rentals.value[index].status === 'returned') newStatus = 'rented'

    if (index !== -1) {
      rentals.value[index] = { ...rentals.value[index], status: newStatus }
      saveRentalToLocalStorage()
    }
  }

  const deleteRental = (id: string) => {
    const index = rentals.value.findIndex((rental) => rental.id === id)
    if (index !== -1) {
      rentals.value.splice(index, 1)
      saveRentalToLocalStorage()
    }
  }

  const saveRentalToLocalStorage = () => {
    localStorage.setItem('rentals', JSON.stringify(rentals.value))
  }

  return {
    rentals,
    getRentals,
    getRentalById,
    getRentalsByClientId,
    getRentalsByStatus,
    getRentalsList,
    addRental,
    updateRental,
    changeRentalStatus,
    deleteRental
  }
})
