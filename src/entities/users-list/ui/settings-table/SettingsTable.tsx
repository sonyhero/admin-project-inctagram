import React from 'react'

import { Nullable, useTranslation } from '@/shared'
import { BlockStatus } from '@/shared/api/generated/types.generated'
import { SelectBox, TextField } from '@belozerov-egor/ui-libs'

import s from './SettingsTable.module.scss'

type Props = {
  setBlockStatus: (value: Nullable<BlockStatus.Blocked>) => void
}

export const SettingsTable = ({ setBlockStatus }: Props) => {
  const { t } = useTranslation()

  const options: OptionsType[] = [
    {
      description: t.usersList.settingsTableDescription.blocked,
      value: BlockStatus.Blocked,
    },
    {
      description: t.usersList.settingsTableDescription.notBlocked,
      value: null,
    },
  ]

  return (
    <div className={s.settings}>
      <TextField className={s.input} placeholder={t.usersList.search} type={'searchType'} />
      <SelectBox
        onValueChange={setBlockStatus}
        options={options}
        placeholder={t.usersList.settingsTableDescription.notSelected}
      />
    </div>
  )
}

type OptionsType = {
  description: string
  value: Nullable<BlockStatus.Blocked | undefined>
}
