import { mount } from '@vue/test-utils'
import MovieCard from './MovieCard.vue'
import { describe, expect, it } from 'vitest'

describe('MovieCard', () => {
  it('renders movie title and year correctly', () => {
    const movie = {
      Title: 'Inception',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
      Year: '2010'
    }

    const wrapper = mount(MovieCard, {
      props: { movie }
    })

    expect(wrapper.find('h3').text()).toBe(movie.Title)
    expect(wrapper.find('p').text()).toBe(movie.Year)
  })

  it('renders movie poster correctly', () => {
    const movie = {
      Title: 'Inception',
      Poster: 'inception.jpg',
      Year: '2010'
    }

    const wrapper = mount(MovieCard, {
      props: { movie }
    })

    expect(wrapper.find('img').attributes('src')).toBe(movie.Poster)
    expect(wrapper.find('img').attributes('alt')).toBe('Movie Poster')
  })
})
