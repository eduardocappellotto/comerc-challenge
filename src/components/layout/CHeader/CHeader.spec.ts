import { mount } from '@vue/test-utils'
import CHeader from './CHeader.vue'
import AImage from '@/components/atoms/Image/AImage.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSnackbarStore } from '@/stores/snackbar'
import { vi, describe, it, expect } from 'vitest'

// Mock useRouter
vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

// Mock useAuthStore
vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => {
    logout: vi.fn()
  })
}))

// Mock useSnackbarStore
vi.mock('@/stores/snackbar', () => ({
  useSnackbarStore: vi.fn()
}))

describe('CHeader', () => {
  it('renders header with correct elements', () => {
    const wrapper = mount(CHeader, {
      components: AImage
    })

    // Check if header contains logo image
    expect(wrapper.find('img').exists()).toBe(true)

    // Check if header contains navigation buttons
    expect(wrapper.findAll('button')).toHaveLength(4) // Assuming there are 4 navigation buttons

    // Check if header contains logout button
    expect(wrapper.find('button').text()).toBe('Sair')
  })

  it('renders navigation buttons and logout button when authenticated', async () => {
    const wrapper = mount(CHeader)
    const authStore = { isAuthenticated: true }
    useAuthStore.mockReturnValue(authStore)

    // Update the wrapper
    await wrapper.vm.$nextTick()

    // Check if navigation buttons are rendered
    expect(wrapper.findAll('button')).toHaveLength(5) // 4 navigation buttons + logout button
  })

  it('triggers navigation to correct routes on navigation button click', async () => {
    const wrapper = mount(CHeader)
    const authStore = { isAuthenticated: true }
    useAuthStore.mockReturnValue(authStore)
    useRouter.mockReturnValue({ push: vi.fn() })

    // Update the wrapper
    await wrapper.vm.$nextTick()

    // Click on a navigation button
    await wrapper.findAll('button').at(0).trigger('click')

    // Check if router.push is called with the correct route
    expect(useRouter().push).toHaveBeenCalledWith('/movies')
  })

  it('triggers logout process on logout button click', async () => {
    const wrapper = mount(CHeader)
    const authStore = { isAuthenticated: true, logout: vi.fn() }
    vi.mocked(useAuthStore).mockReturnValue(authStore)
    useRouter.mockReturnValue({ push: vi.fn() })
    const snackbarStore = { show: vi.fn() }
    vi.mocked(useSnackbarStore).mockReturnValue(snackbarStore)

    // Update the wrapper
    await wrapper.vm.$nextTick()

    // Click on the logout button
    await wrapper.find('button').trigger('click')

    // Check if logout is called
    expect(authStore.logout).toHaveBeenCalled()

    // Check if snackbar show is called with success message
    expect(snackbarStore.show).toHaveBeenCalledWith({
      message: 'Saiu com sucesso!',
      color: 'success'
    })

    // Check if router.push is called with the correct route
    expect(useRouter().push).toHaveBeenCalledWith({ name: 'Login' })
  })
})
