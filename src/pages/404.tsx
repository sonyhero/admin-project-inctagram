import { getAuthLayout } from '@/shared/providers'
import { ErrorPage } from '@/widgets'

const PageNotFound = () => {
  return <ErrorPage />
}

export default PageNotFound
PageNotFound.getLayout = getAuthLayout
