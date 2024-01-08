import { useEffect, useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import ru from '@/shared/ui/icons/ru-flag/ru.png'
import en from '@/shared/ui/icons/uk-flag/en.png'
import { SelectBox } from '@belozerov-egor/ui-libs'
import Image from 'next/image'
import { useRouter } from 'next/router'

export type Locale = 'en' | 'ru'

export const LangSwitcher = () => {
  const { asPath, locale, pathname, push, query } = useRouter()
  const { t } = useTranslation()

  const [lang, setLang] = useState<Locale>(locale as Locale)

  useEffect(() => {
    localStorage.setItem('locale', locale as Locale)
  }, [locale])

  const options = [
    {
      description: t.header.en,
      img: <Image alt={'en'} src={en} style={{ height: '1.5rem', width: '1.5rem' }} />,
      value: 'en',
    },
    {
      description: t.header.ru,
      img: <Image alt={'ru'} src={ru} style={{ height: '1.5rem', width: '1.5rem' }} />,
      value: 'ru',
    },
  ]

  const currentLanguage = options.filter(o => o.value === lang)[0]

  const changeLang = (value: string) => {
    if (currentLanguage.value !== value) {
      setLang(value as Locale)
      push({ pathname, query }, asPath, { locale: value })
    }
  }

  return <SelectBox onValueChange={changeLang} options={options} value={currentLanguage} />
}
