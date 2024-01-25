import { useTranslation } from '@/shared'
import { Typography } from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import error from 'public/error.svg'

import s from './ErrorPage.module.scss'

export const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <div className={s.errorPage}>
      <Image alt={'error404'} priority src={error} />
      <Typography className={s.errorMessage} variant={'regular16'}>
        {t.error404.pageNotFound}
      </Typography>
    </div>
  )
}
