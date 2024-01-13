import { TUseLocalStorage } from '@/shared'

export function useSessionStorage<T>(key: string): TUseLocalStorage<T> {
  const isBrowser = typeof window !== 'undefined'

  const setItem = (value: T): void => {
    if (isBrowser) {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getItem = (): T | undefined => {
    if (isBrowser) {
      try {
        const item = window.sessionStorage.getItem(key)

        if (item === null) {
          return undefined
        }

        return JSON.parse(item)
      } catch (error) {
        console.log(error)

        return undefined
      }
    }
  }

  const removeItem = (): void => {
    if (isBrowser) {
      try {
        window.sessionStorage.removeItem(key)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return [getItem, setItem, removeItem]
}
