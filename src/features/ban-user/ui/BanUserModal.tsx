import React, { ChangeEvent, useState } from 'react'

import { useBanUserMutation, useUnBanMutation } from '@/features/ban-user/api/banUserApi.generated'
import { Nullable } from '@/shared'
import { Modal, SelectBox, TextAreaField, Typography } from '@belozerov-egor/ui-libs'
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

enum ReasonsToBanType {
  BAD = 'Bad behavior',
  OTHER = 'Another reason',
  PLACEMENT = 'Advertising placement',
}

export const BanUserModal = (props: Props) => {
  const { currentUser, isBanModal, onClose, open, refetchData } = props
  const [reasonToBan, setReasonToBan] = useState<Nullable<ReasonsToBanType>>(null)
  const [reasonToBanDescription, setReasonToBanDescription] = useState<string>('')
  const [banUserMutation] = useBanUserMutation()
  const [unBanUserMutation] = useUnBanMutation()

  const onChangeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 100
    const textValue = event.target.value

    if (textValue.length <= maxLength) {
      setReasonToBanDescription(textValue)
    }
  }

  const onSelectHandler = (value: ReasonsToBanType) => {
    setReasonToBanDescription(value === ReasonsToBanType.OTHER ? '' : value)
    setReasonToBan(value)
  }

  const reasonsToBan = [
    { value: ReasonsToBanType.BAD },
    { value: ReasonsToBanType.PLACEMENT },
    { value: ReasonsToBanType.OTHER },
  ]

  const title = isBanModal ? 'Ban user' : 'Unban '
  const messageContent = `Are you sure to ${isBanModal ? 'ban' : 'unban'} this user, `

  const closeBanModalHandler = () => {
    setReasonToBanDescription('')
    setReasonToBan(null)
    onClose(false)
  }

  const banOrUnBanUser = (userId: number) =>
    isBanModal
      ? banUserMutation({
          variables: {
            banReason: reasonToBanDescription,
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

  // const banTitleFirstButton = reasonToBanDescription ? 'Yes' : undefined
  // const unBanTitleFirstButton = 'Yes'
  // const titleFirstButton = isBanModal ? banTitleFirstButton : unBanTitleFirstButton

  const buttonBlockClassName = clsx(s.buttonBlock, {
    [s.onlyOneButton]: isBanModal && !reasonToBanDescription,
  })

  return (
    <Modal
      buttonBlockClassName={buttonBlockClassName}
      callBack={callBackHandler}
      onClose={closeBanModalHandler}
      open={open}
      showCloseButton
      title={title}
      titleFirstButton={'Yes'}
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
              onValueChange={onSelectHandler}
              options={reasonsToBan}
              placeholder={'Reasons to ban'}
              selectContentClassName={s.selectContent}
            />
          </div>
        )}
        {isBanModal && reasonToBan === ReasonsToBanType.OTHER && (
          <div className={s.textArea}>
            <TextAreaField
              maxLength={100}
              onChange={onChangeTextHandler}
              placeholder={'Enter reason to ban'}
              value={reasonToBanDescription}
            />
            <Typography color={'secondary'} variant={'small'}>
              {reasonToBanDescription.length}/100
            </Typography>
          </div>
        )}
      </div>
    </Modal>
  )
}
