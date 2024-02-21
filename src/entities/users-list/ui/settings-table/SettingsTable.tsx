import React from 'react'

import { Nullable, useTranslation } from '@/shared'
import { UserBlockStatus } from '@/shared/api/generated/types.generated'
import { SelectBox, TextField } from '@belozerov-egor/ui-libs'

import s from './SettingsTable.module.scss'

type Props = {
  onChangeText: (value: string) => void
  onSearchClear: () => void
  setBlockStatus: (value: UserBlockStatus) => void
  textValue: string
}

export const SettingsTable = (props: Props) => {
  const { onChangeText, onSearchClear, setBlockStatus, textValue } = props
  const { t } = useTranslation()

  const options: OptionsType[] = [
    {
      description: t.usersList.settingsTableDescription.blocked,
      value: UserBlockStatus.Blocked,
    },
    {
      description: t.usersList.settingsTableDescription.notBlocked,
      value: UserBlockStatus.All,
    },
    // {
    //   description: t.usersList.settingsTableDescription.notSelected,
    //   value: null,
    // },
  ]

  return (
    <div className={s.settings}>
      <TextField
        className={s.input}
        onChangeText={onChangeText}
        onSearchClear={onSearchClear}
        placeholder={t.usersList.search}
        type={'searchType'}
        value={textValue}
      />
      <SelectBox
        onValueChange={setBlockStatus}
        options={options}
        placeholder={t.usersList.settingsTableDescription.notBlocked}
      />
    </div>
  )
}

type OptionsType = {
  description: string
  value: Nullable<UserBlockStatus>
}
