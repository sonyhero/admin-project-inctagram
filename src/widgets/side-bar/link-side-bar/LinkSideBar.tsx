import { ReactNode } from 'react'

import { Nullable } from '@/shared/types'
import { VariantIconType } from '@/widgets/side-bar/SideBarTypes'
import { Typography } from '@belozerov-egor/ui-libs'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './LinkSideBar.module.scss'

type Props = {
  callBack?: () => void
  children: ReactNode
  className?: string
  handleClick: (variant: Nullable<VariantIconType>) => void
  link?: string
  nameLink: string
  variantIcon?: Nullable<VariantIconType>
}

export const LinkSideBar = (props: Props) => {
  const { callBack, children, className, handleClick, link, nameLink, variantIcon } = props

  const styles = {
    check: clsx(s.nameLink, link === variantIcon && s.active),
    container: clsx(s.container, className),
  }

  const handleItemClick = () => {
    callBack?.()
    handleClick(variantIcon!)
  }

  return (
    <div className={styles.container} onClick={handleItemClick}>
      <Link className={s.link} href={`${link}`} tabIndex={1}>
        {children}
        <Typography className={styles.check} color={'primary'} variant={'bold14'}>
          {nameLink}
        </Typography>
      </Link>
    </div>
  )
}
