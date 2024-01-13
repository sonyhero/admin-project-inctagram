import { useEffect } from 'react'

import { PATH, useSessionStorage } from '@/shared'
import { useRouter } from 'next/router'

export const useIsLoggedIn = () => {
  const router = useRouter()
  const [getItem] = useSessionStorage('isLoggedIn')
  const isLoggedIn = getItem()
  const currentPath = router.pathname

  useEffect(() => {
    if (currentPath.includes('admin') && isLoggedIn) {
      return
    }
    if (currentPath.includes('/') && isLoggedIn) {
      router.push(PATH.USERS)
    }
    if (currentPath.includes('admin') && !isLoggedIn) {
      router.push(PATH.SIGN_IN)
    }
    if (currentPath.includes('/') && !isLoggedIn) {
      router.push(PATH.SIGN_IN)
    }
  }, [isLoggedIn, currentPath, router])

  return {
    isLoggedIn,
  }
}
