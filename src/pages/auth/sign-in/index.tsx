import { SignIn } from '@/features'
import { getAuthLayout } from '@/shared/providers'

const SignInPage = () => {
  return <SignIn />
}

export default SignInPage
SignInPage.getLayout = getAuthLayout
