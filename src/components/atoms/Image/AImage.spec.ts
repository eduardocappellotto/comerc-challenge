import { mount } from '@vue/test-utils'
import AImage from './AImage.vue'
import { describe, it, expect } from 'vitest'

describe('AImage', () => {
  it('renders image with correct props', () => {
    const src = 'https://example.com/image.jpg'
    const alt = 'Test Image'
    const imageClass = 'custom-class'

    const wrapper = mount(AImage, {
      props: {
        src,
        alt,
        imageClass
      }
    })

    // Check if image has correct src
    expect(wrapper.find('img').attributes('src')).toBe(src)

    // Check if image has correct alt
    expect(wrapper.find('img').attributes('alt')).toBe(alt)

    // Check if image has correct class
    expect(wrapper.find('img').classes()).toContain(imageClass)
  })
})
