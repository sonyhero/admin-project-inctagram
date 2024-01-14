import { UsersList } from '@/entities/users-list'
import { getBaseLayout } from '@/shared'

const UsersPage = () => {
  return <UsersList />
}

export default UsersPage
UsersPage.getLayout = getBaseLayout
