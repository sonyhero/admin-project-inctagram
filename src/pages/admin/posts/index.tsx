import React from 'react'

import { useGetPostsQuery } from '@/entities/posts-list/postListApi.generated'
import { getBaseLayout } from '@/shared'

const PostsPage = () => {
  const { data, error, loading } = useGetPostsQuery({
    variables: {
      // endCursorPostId: '', // value for 'endCursorPostId'
      pageSize: 10,
      searchTerm: '',
      sortBy: 'asc',
      // sortDirection: ''
    },
  })

  console.log(data)

  return <div>Posts</div>
}

export default PostsPage
PostsPage.getLayout = getBaseLayout
