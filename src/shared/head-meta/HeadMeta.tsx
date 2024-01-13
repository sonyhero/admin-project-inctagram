import { useTranslation } from '@/shared'
import Head from 'next/head'

type Props = {
  description?: string
  title?: string
}

export const HeadMeta = ({ description, title }: Props) => {
  const { t } = useTranslation()

  return (
    <Head>
      <title>{title ?? 'NextJS App'}</title>
      <meta content={description ?? t.metaDescription} name={'description'} />
      <link href={'/favicon.svg'} rel={'icon'} type={'image/svg+xml'} />
    </Head>
  )
}
