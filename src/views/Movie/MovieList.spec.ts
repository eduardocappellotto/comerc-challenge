import { VueWrapper, shallowMount } from '@vue/test-utils'
import MovieList from './MovieList.vue'
import MovieService from '@/services/movieService'
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest'

vi.mock('@/services/movieService')

describe('MovieList', () => {
  let wrapper: VueWrapper<any, any>

  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  beforeEach(() => {
    const movies = [
      { Title: 'Movie 1', Year: '2021', imdbID: '1' },
      { Title: 'Movie 2', Year: '2022', imdbID: '2' }
    ]
    vi.mocked(MovieService.searchMovies).mockResolvedValue(movies)
    wrapper = shallowMount(MovieList)
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('searches movies on mount', async () => {
    await wrapper.vm.$nextTick() // Wait for the search to complete
    expect(MovieService.searchMovies).toHaveBeenCalled()
    expect(wrapper.vm.movies).toEqual(expect.any(Array))
  })

  it('filters movies by search query', async () => {
    wrapper.vm.searchQuery = 'Movie 1'
    await wrapper.vm.search()
    expect(wrapper.vm.filteredMovies.length).toBe(1)
  })

  /*it('filters movies by year', async () => {
    wrapper.vm.selectedYear = '2021'
    await wrapper.vm.search()
    expect(wrapper.vm.filteredMovies.length).toBe(1)
  }) */

  it('computes years correctly', () => {
    expect(wrapper.vm.years).toEqual(expect.arrayContaining(['2021', '2022']))
  })

  it('handles errors in search method', async () => {
    vi.mocked(MovieService.searchMovies).mockRejectedValue(new Error('Error'))
    await wrapper.vm.search()

    expect(console.error).toHaveBeenCalled()
  })
})
