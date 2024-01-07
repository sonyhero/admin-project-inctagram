import { SignIn } from '@/pages/page-flat/auth/sign-in'
import { getAuthLayout } from '@/shared/providers'

const SignInPage = () => {
  return <SignIn />
}

export default SignInPage
SignInPage.getLayout = getAuthLayout
