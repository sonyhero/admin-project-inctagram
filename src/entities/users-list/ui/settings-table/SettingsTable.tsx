import React from 'react'

import { SelectBox, TextField } from '@belozerov-egor/ui-libs'

import s from './SettingsTable.module.scss'

export const SettingsTable = () => {
  const options = [
    {
      description: 'Blocked',
      value: 'blocked',
    },
    {
      description: 'Not Blocked',
      value: 'notBlocked',
    },
  ]

  return (
    <div className={s.settings}>
      <TextField className={s.input} type={'searchType'} />
      <SelectBox options={options} placeholder={'Not selected'} />
    </div>
  )
}
