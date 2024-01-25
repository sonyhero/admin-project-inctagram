import React, { useState } from 'react'

import { useBanUserMutation } from '@/features/ban-user/api/banUserApi.generated'
import { Nullable } from '@/shared'
import { Modal, SelectBox, Typography } from '@belozerov-egor/ui-libs'
import NProgress from 'nprogress'

import s from './BanUserModal.module.scss'

type Props = {
  currentUser: Nullable<{ userId: number; userName: string }>
  onClose: (value: boolean) => void
  open: boolean
  refetchData: () => void
}

export const BanUserModal = (props: Props) => {
  const { currentUser, onClose, open, refetchData } = props
  const [reasonToBan, setReasonToBan] = useState<string>('')
  const [banUserMutation] = useBanUserMutation()

  const reasonsToBan = [
    { value: 'Bad behavior' },
    { value: 'Advertising placement' },
    { value: 'Another reason' },
  ]

  const closeBanModalHandler = () => {
    onClose(false)
  }

  const banUserHandler = () => {
    if (currentUser) {
      NProgress.start()
      banUserMutation({
        variables: {
          banReason: reasonToBan,
          userId: currentUser.userId,
        },
      })
        .then(() => {
          NProgress.done()
          refetchData()
          closeBanModalHandler()
        })
        .catch(() => {
          console.log('error')
        })
    }
  }

  return (
    <Modal
      buttonBlockClassName={s.buttonBlock}
      callBack={banUserHandler}
      onClose={closeBanModalHandler}
      open={open}
      showCloseButton
      title={'Ban user'}
      titleFirstButton={'Yes'}
      titleSecondButton={'No'}
    >
      <div className={s.modalContentBlock}>
        <Typography variant={'regular16'}>
          Are you sure to ban this user, <strong>{currentUser?.userName}</strong>?
        </Typography>
        <div className={s.selectBlock}>
          <SelectBox
            onValueChange={setReasonToBan}
            options={reasonsToBan}
            placeholder={'Reasons to ban'}
            selectContentClassName={s.selectContent}
          />
        </div>
      </div>
    </Modal>
  )
}
