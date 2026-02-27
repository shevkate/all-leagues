import { AppError, handleError } from '@/errors/AppError'

const cache = new Map<string, Promise<unknown>>()

const get = <T>(url: string): Promise<T> => {
  if (cache.has(url)) {
    return cache.get(url) as Promise<T>
  }

  const request = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new AppError(
          `HTTP error ${response.status}`,
          'FETCH_ERROR',
        )
      }
      return response.json() as Promise<T>
    })
    .catch((error) => {
      cache.delete(url)
      throw handleError(error)
    })

  cache.set(url, request)
  return request
}

export const createApiService = (baseUrl: string) => ({
  get: <T>(endpoint: string) => get<T>(`${baseUrl}${endpoint}`),
})
