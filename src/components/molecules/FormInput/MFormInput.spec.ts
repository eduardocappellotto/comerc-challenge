import { mount } from '@vue/test-utils'
import MFormInput from './MFormInput.vue'
import { describe, it, expect } from 'vitest'

describe('MFormInput', () => {
  it('renders input field with correct props', () => {
    const propsData = {
      name: 'testInput',
      label: 'Test Input',
      type: 'text',
      placeholder: 'Enter text',
      error: undefined
    }

    const wrapper = mount(MFormInput, {
      propsData
    })

    // Check if label renders correctly
    expect(wrapper.find('label').text()).toBe(propsData.label)

    // Check if input type is correct
    expect(wrapper.find('input').element.type).toBe(propsData.type)

    // Check if placeholder is set correctly
    expect(wrapper.find('input').attributes('placeholder')).toBe(propsData.placeholder)

    // Check if error message is not rendered
    expect(wrapper.find('.text-red-500').exists()).toBe(false)
  })

  it('toggles password visibility', async () => {
    const propsData = {
      name: 'passwordInput',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
      error: undefined
    }

    const wrapper = mount(MFormInput, {
      propsData
    })

    // Check if password is initially hidden
    expect(wrapper.find('input').element.type).toBe('password')

    // Click on the password visibility toggle button
    await wrapper.find('button').trigger('click')

    // Check if password visibility is toggled
    expect(wrapper.find('input').element.type).toBe('text')
  })

  it('displays error message when error prop is provided', async () => {
    const propsData = {
      name: 'errorInput',
      label: 'Error Input',
      type: 'text',
      placeholder: 'Enter text',
      error: 'This field is required'
    }

    const wrapper = mount(MFormInput, {
      propsData
    })

    // Check if error message is rendered
    expect(wrapper.find('.text-red-500').text()).toBe(propsData.error)
  })
})
