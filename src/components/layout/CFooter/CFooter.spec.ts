import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CFooter from './CFooter.vue'

describe('CFooter', () => {
  it('renders current year and website name', () => {
    const currentYear = new Date().getFullYear()
    const wrapper = mount(CFooter)

    // Check if footer contains current year
    expect(wrapper.text()).toContain(currentYear)

    // Check if footer contains website name
    expect(wrapper.text()).toContain('eduardocappellotto.com')
  })

  // Additional tests can be added for specific styling or other functionality if needed
})
