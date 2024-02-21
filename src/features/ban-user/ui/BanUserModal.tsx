import React, { useState } from 'react'

import { useBanUserMutation, useUnBanMutation } from '@/features/ban-user/api/banUserApi.generated'
import { Nullable } from '@/shared'
import { Modal, SelectBox, Typography } from '@belozerov-egor/ui-libs'
import { clsx } from 'clsx'
import NProgress from 'nprogress'

import s from './BanUserModal.module.scss'

type Props = {
  currentUser: Nullable<{ userId: number; userName: string }>
  isBanModal: boolean
  onClose: (value: boolean) => void
  open: boolean
  refetchData?: () => void
}

export const BanUserModal = (props: Props) => {
  const { currentUser, isBanModal, onClose, open, refetchData } = props
  const [reasonToBan, setReasonToBan] = useState<string>('')
  const [banUserMutation] = useBanUserMutation()
  const [unBanUserMutation] = useUnBanMutation()

  const reasonsToBan = [
    { value: 'Bad behavior' },
    { value: 'Advertising placement' },
    { value: 'Another reason' },
  ]

  const title = isBanModal ? 'Ban user' : 'Unban '
  const messageContent = `Are you sure to ${isBanModal ? 'ban' : 'unban'} this user, `

  const closeBanModalHandler = () => {
    setReasonToBan('')
    onClose(false)
  }

  const banOrUnBanUser = (userId: number) =>
    isBanModal
      ? banUserMutation({
          variables: {
            banReason: reasonToBan,
            userId,
          },
        })
      : unBanUserMutation({
          variables: {
            userId,
          },
        })

  const callBackHandler = () => {
    if (currentUser) {
      NProgress.start()
      banOrUnBanUser(currentUser.userId)
        .then(() => {
          NProgress.done()
          refetchData?.()
          closeBanModalHandler()
        })
        .catch(() => {
          console.log('error')
        })
    }
  }

  const banTitleFirstButton = reasonToBan ? 'Yes' : undefined
  const unBanTitleFirstButton = 'Yes'
  const titleFirstButton = isBanModal ? banTitleFirstButton : unBanTitleFirstButton

  const buttonBlockClassName = clsx(s.buttonBlock, {
    [s.onlyOneButton]: isBanModal && !reasonToBan,
  })

  return (
    <Modal
      buttonBlockClassName={buttonBlockClassName}
      callBack={callBackHandler}
      onClose={closeBanModalHandler}
      open={open}
      showCloseButton
      title={title}
      titleFirstButton={titleFirstButton}
      titleSecondButton={'No'}
    >
      <div className={s.modalContentBlock}>
        <Typography variant={'regular16'}>
          {messageContent}
          <strong>{currentUser?.userName}</strong>?
        </Typography>
        {isBanModal && (
          <div className={s.selectBlock}>
            <SelectBox
              onValueChange={setReasonToBan}
              options={reasonsToBan}
              placeholder={'Reasons to ban'}
              selectContentClassName={s.selectContent}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
