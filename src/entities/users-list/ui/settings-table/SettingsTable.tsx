import React from 'react'

import { Nullable, useTranslation } from '@/shared'
import { BlockStatus } from '@/shared/api/generated/types.generated'
import { SelectBox, TextField } from '@belozerov-egor/ui-libs'

import s from './SettingsTable.module.scss'

type Props = {
  blockStatus: Nullable<BlockStatus.Blocked | undefined>
  onChangeText: (value: string) => void
  onSearchClear: () => void
  setBlockStatus: (value: Nullable<BlockStatus.Blocked | undefined>) => void
  textValue: string
}

export const SettingsTable = (props: Props) => {
  const { blockStatus, onChangeText, onSearchClear, setBlockStatus, textValue } = props
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
      <TextField
        className={s.input}
        onChangeText={onChangeText}
        onSearchClear={onSearchClear}
        placeholder={t.usersList.search}
        type={'searchType'}
        value={textValue}
      />
      <SelectBox
        defaultValue={blockStatus}
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
