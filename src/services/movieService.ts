import axios from 'axios'

export default class MovieService {
  static async searchMovies(query: string, year: string): Promise<any[]> {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=b0010f39&type=movie&s=${query}&y=${year}`
      )

      return response.data.Search || []
    } catch (error) {
      console.error('Error fetching movies:', error)
      return []
    }
  }
}
