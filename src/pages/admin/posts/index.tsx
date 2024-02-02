import React, { useEffect, useState } from 'react'

import { useGetPostsQuery } from '@/entities/posts-list/postListApi.generated'
import { getBaseLayout, useDebounce, useTranslation } from '@/shared'
import { Post } from '@/widgets/post'
import { TextField } from '@belozerov-egor/ui-libs'

import s from './PostsList.module.scss'

const PostsPage = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { data, error, loading } = useGetPostsQuery({
    variables: {
      // endCursorPostId: '', // value for 'endCursorPostId'
      pageSize: 8,
      searchTerm,
      sortBy: 'asc',
      // sortDirection: ''
    },
  })

  const handleClearSearch = () => {
    setSearch('')
  }

  const debouncedValue = useDebounce<string>(search, 400)

  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue])

  const mappedPosts = data?.getPosts.items.map((post, index) => {
    return <Post key={index} {...post} />
  })

  return (
    <>
      <TextField
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        placeholder={t.usersList.search}
        type={'searchType'}
        value={search}
      />
      <div className={s.posts}>{mappedPosts}</div>
    </>
  )
}

export default PostsPage
PostsPage.getLayout = getBaseLayout
