import { computed } from 'vue'
import useAuthStore from '@/stores/auth'

export default function useAuth() {
  const { currentUser, login, logout } = useAuthStore()

  const isAuthenticated = computed<boolean>(() => !!currentUser.value)

  return {
    currentUser,
    isAuthenticated,
    login,
    logout
  }
}
