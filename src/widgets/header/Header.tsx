import { LangSwitcher } from '@/features/lang-switcher'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Typography } from '@belozerov-egor/ui-libs'
import Link from 'next/link'

import s from './Header.module.scss'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className={s.header}>
      <div className={`${s.container}`}>
        <Link className={s.home} href={PATH.HOME}>
          <Typography variant={'large'}>{t.header.inctagram}</Typography>
          <Typography variant={'small'}>{t.header.super}</Typography>
          <Typography variant={'sb_small'}>{t.header.admin}</Typography>
        </Link>
        <div className={s.rightBlock}>
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}
