import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useGetProfilePostImagesQuery } from '@/entities/profile/api/profileImagesApi.generated'
import { Typography } from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import s from './UserPhotoTable.module.scss'

import imageIcon from '/public/imageIcon.svg'

export const UserPhotoTable = () => {
  const scrollableID = 'scrollableID'
  const { query } = useRouter()
  const userId = Number(query.id)
  const [innerHeight, setInnerHeight] = useState<number>(0)
  const [paddingValue, setPaddingValue] = useState<number>(200)

  const { data, fetchMore, loading } = useGetProfilePostImagesQuery({
    variables: {
      endCursorId: 0,
      userId,
    },
  })

  const endCursorId = data?.getPostsByUser?.items?.slice(-1)[0].id

  const loadMore = useCallback(() => {
    NProgress.start()
    fetchMore({
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult.getPostsByUser?.items
        const { pageSize, pagesCount, totalCount } = fetchMoreResult.getPostsByUser

        return newPosts?.length
          ? {
              getPostsByUser: {
                __typename: previousResult.getPostsByUser.__typename,
                items: [...previousResult.getPostsByUser.items!, ...newPosts],
                pageSize,
                pagesCount,
                totalCount,
              },
            }
          : previousResult
      },
      variables: {
        endCursorId,
        pageSize: 4,
      },
    })
      .catch(() => {
        console.log('error')
      })
      .finally(() => {
        NProgress.done()
      })
  }, [endCursorId, fetchMore])

  const mappedPosts = data?.getPostsByUser.items
    ?.filter(img => img.width === 1440)
    .map(post => {
      return (
        <Image
          alt={'post picture'}
          className={s.post}
          height={250}
          key={post.id}
          priority
          src={post.url ?? imageIcon}
          width={250}
        />
      )
    })

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
      const profileContentHeight = 100
      const padding = height - profileContentHeight

      setPaddingValue(padding)
    }
  }, [innerHeight])

  if (typeof document !== 'undefined') {
    loading && NProgress.start()
    !loading && NProgress.done()
  }

  return (
    <>
      {!!data?.getPostsByUser.items && (
        <div className={s.postsWrap} id={scrollableID}>
          <InfiniteScroll
            className={s.postsBlock}
            dataLength={data?.getPostsByUser?.items.length}
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
      {!loading && !data?.getPostsByUser.items && (
        <Typography variant={'bold16'}>No Posts</Typography>
      )}
    </>
  )
}
