import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import type { Client } from '@/types/client'
import { generateClients } from '@/utils/mocks/generateClients'

const clients = ref<Client[]>([...generateClients(10)])

export const useClientStore = defineStore('client', () => {
  const storedClientsJSON = localStorage.getItem('clients')
  if (storedClientsJSON) {
    try {
      const parsedClients = JSON.parse(storedClientsJSON)
      clients.value = parsedClients
    } catch (error) {
      throw new Error('Error parsing stored clients data:' + error)
    }
  }

  const getClients = computed(() => clients.value.filter((client) => !client.deleted))

  const saveClientsToLocalStorage = () => {
    localStorage.setItem('clients', JSON.stringify(clients.value))
  }

  const getClientById = (id: string): Client | undefined => {
    return clients.value.find((client) => client.id === id)
  }

  const createClient = (newClient: Client) => {
    clients.value.push(newClient)
    saveClientsToLocalStorage()
  }

  const updateClient = (updatedClient: Client) => {
    const index = clients.value.findIndex((client) => client.id === updatedClient.id)
    if (index !== -1) {
      clients.value[index] = updatedClient
      saveClientsToLocalStorage()
    }
  }

  const softDeleteClient = (id: string) => {
    const index = clients.value.findIndex((client) => client.id === id)
    if (index !== -1) {
      clients.value[index].deleted = true
      saveClientsToLocalStorage()
    }
  }

  onMounted(saveClientsToLocalStorage)

  return {
    clients,
    getClients,
    getClientById,
    createClient,
    updateClient,
    softDeleteClient,
    saveClientsToLocalStorage
  }
})
