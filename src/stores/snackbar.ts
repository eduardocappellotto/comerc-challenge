import { defineStore } from 'pinia'
import { ref } from 'vue'

interface SnackbarMessage {
  id?: number
  message: string
  color: string
  timeout?: number
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const messages = ref([] as SnackbarMessage[])

  function show({ message, color = 'info', timeout = 3000 }: SnackbarMessage) {
    const id = Date.now()
    messages.value.push({ id, message, color, timeout })
    setTimeout(() => {
      dismiss(id)
    }, timeout)
  }

  function dismiss(id: number) {
    const index = messages.value.findIndex((msg) => msg.id === id)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }

  return { messages, show, dismiss }
})
