import React from 'react'

import { PostsList } from '@/entities/posts-list'
import { getBaseLayout } from '@/shared'

const PostsPage = () => {
  return <PostsList />
}

export default PostsPage
PostsPage.getLayout = getBaseLayout
