import { getBaseLayout, useIsLoggedIn } from '@/shared'

const HomePage = () => {
  const {} = useIsLoggedIn()
}

export default HomePage
HomePage.getLayout = getBaseLayout
