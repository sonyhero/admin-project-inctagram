import { Profile } from '@/entities/profile/ui'
import { getAuthLayout } from '@/shared'

function UserPage() {
  return <Profile />
}

export default UserPage
UserPage.getLayout = getAuthLayout
