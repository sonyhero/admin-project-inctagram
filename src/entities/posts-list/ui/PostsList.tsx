import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useGetPostsQuery } from '@/entities/posts-list/api/postListApi.generated'
import { useDebounce, useTranslation } from '@/shared'
import { Post } from '@/widgets/post'
import { TextField, Typography } from '@belozerov-egor/ui-libs'
import NProgress from 'nprogress'

import s from './PostsList.module.scss'

export const PostsList = () => {
  const scrollableID = 'scrollableID'
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [innerHeight, setInnerHeight] = useState<number>(0)
  const [paddingValue, setPaddingValue] = useState<number>(200)

  const { data, fetchMore, loading } = useGetPostsQuery({
    variables: {
      endCursorPostId: 0,
      pageSize: 8,
      searchTerm,
      sortBy: 'createAd',
    },
  })

  const endCursorPostId = data?.getPosts.items.slice(-1)[0].id

  const loadMore = useCallback(() => {
    NProgress.start()
    fetchMore({
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult.getPosts.items
        const { pageSize, pagesCount, totalCount } = fetchMoreResult.getPosts

        return newPosts.length
          ? {
              getPosts: {
                __typename: previousResult.getPosts.__typename,
                items: [...previousResult.getPosts.items, ...newPosts],
                pageSize,
                pagesCount,
                totalCount,
              },
            }
          : previousResult
      },
      variables: {
        endCursorPostId,
        pageSize: 4,
        searchTerm,
        sortBy: 'createAd',
      },
    })
      .catch(() => {
        console.log('error')
      })
      .finally(() => {
        NProgress.done()
      })
  }, [endCursorPostId, fetchMore, searchTerm])

  const mappedPosts = data?.getPosts.items.map((post, index) => {
    return <Post key={index} {...post} />
  })

  const debouncedValue = useDebounce<string>(search, 400)

  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    const handleResize = () => {
      setInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const height = window.innerHeight
      const profileContentHeight = 730
      const padding = height - profileContentHeight

      setPaddingValue(padding)
    }
  }, [innerHeight])

  const handleClearSearch = () => {
    setSearch('')
  }

  if (typeof document !== 'undefined') {
    loading && NProgress.start()
    !loading && NProgress.done()
  }

  return (
    <>
      <TextField
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        placeholder={t.usersList.search}
        type={'searchType'}
        value={search}
      />
      {!!data?.getPosts.items && (
        <div className={s.postsBlock} id={scrollableID}>
          <InfiniteScroll
            className={s.posts}
            dataLength={data.getPosts.items.length}
            hasMore
            loader={''}
            next={loadMore}
            scrollableTarget={scrollableID}
            style={{ paddingBottom: `${paddingValue}px` }}
          >
            {mappedPosts}
          </InfiniteScroll>
        </div>
      )}
      {!loading && !data?.getPosts.items && <Typography variant={'bold16'}>No Posts</Typography>}
    </>
  )
}
