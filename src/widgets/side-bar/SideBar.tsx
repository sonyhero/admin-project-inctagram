import { useEffect, useState } from 'react'

import { PaymentsIcon, PostIcon, StatisticsIcon, UserIcon, useTranslation } from '@/shared'
import { PATH } from '@/shared/config/routes'
import { Nullable } from '@/shared/types'
import { VariantIconType } from '@/widgets/side-bar/SideBarTypes'
import { LinkSideBar } from '@/widgets/side-bar/link-side-bar/LinkSideBar'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

const ACTIVE_LINK_COLOR = '#397df6'
const LINK_COLOR = '#fff'

export const SideBar = () => {
  const [variantIcon, setVariantIcon] = useState<Nullable<VariantIconType>>()
  const { t } = useTranslation()
  const { asPath } = useRouter()

  useEffect(() => {
    setVariantIcon(asPath)
  }, [asPath])

  const handleItemClick = (variant: Nullable<VariantIconType>) => {
    setVariantIcon(variant)
  }

  return (
    <>
      <div className={s.navbar}>
        <div className={s.mainBlock}>
          <div className={s.primaryBlock}>
            <LinkSideBar
              handleClick={() => {
                handleItemClick(PATH.USERS)
              }}
              link={PATH.USERS}
              nameLink={t.sidebar.useList}
              variantIcon={variantIcon}
            >
              <UserIcon
                color={variantIcon === PATH.USERS ? ACTIVE_LINK_COLOR : LINK_COLOR}
                outline={variantIcon !== PATH.USERS}
              />
            </LinkSideBar>
            <LinkSideBar
              handleClick={() => {}}
              link={PATH.STATISTICS}
              nameLink={t.sidebar.statistics}
              variantIcon={variantIcon}
            >
              <StatisticsIcon
                color={variantIcon === PATH.STATISTICS ? ACTIVE_LINK_COLOR : LINK_COLOR}
              />
            </LinkSideBar>
            <LinkSideBar
              handleClick={() => handleItemClick(PATH.PAYMENTS)}
              link={PATH.PAYMENTS}
              nameLink={t.sidebar.paymentsList}
              variantIcon={variantIcon}
            >
              <PaymentsIcon
                color={variantIcon === PATH.PAYMENTS ? ACTIVE_LINK_COLOR : LINK_COLOR}
              />
            </LinkSideBar>
            <LinkSideBar
              handleClick={() => handleItemClick(PATH.POSTS)}
              link={PATH.POSTS}
              nameLink={t.sidebar.postList}
              variantIcon={variantIcon}
            >
              <PostIcon color={variantIcon === PATH.POSTS ? ACTIVE_LINK_COLOR : LINK_COLOR} />
            </LinkSideBar>
          </div>
        </div>
      </div>
    </>
  )
}
