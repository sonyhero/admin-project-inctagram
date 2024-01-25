import React from 'react'

import { useRemoveUserMutation } from '@/features/remove-user/api/removeUserApi.generated'
import { Nullable } from '@/shared'
import { Modal, Typography } from '@belozerov-egor/ui-libs'
import NProgress from 'nprogress'

import s from './RemoveUserModal.module.scss'

type Props = {
  currentUser: Nullable<{ userId: number; userName: string }>
  onClose: (value: boolean) => void
  open: boolean
  refetchData: () => void
}

export const RemoveUserModal = (props: Props) => {
  const { currentUser, onClose, open, refetchData } = props
  const [removeUserMutation] = useRemoveUserMutation()

  const closeRemoveModalHandler = () => {
    onClose(false)
  }

  const removeUserHandler = () => {
    if (currentUser) {
      NProgress.start()
      removeUserMutation({
        variables: {
          userId: currentUser.userId,
        },
      })
        .then(() => {
          NProgress.done()
          refetchData()
          closeRemoveModalHandler()
        })
        .catch(() => {
          console.log('error')
        })
    }
  }

  return (
    <Modal
      buttonBlockClassName={s.buttonBlock}
      callBack={removeUserHandler}
      onClose={closeRemoveModalHandler}
      open={open}
      showCloseButton
      title={'Delete user'}
      titleFirstButton={'Yes'}
      titleSecondButton={'No'}
    >
      <div className={s.modalContentBlock}>
        <Typography variant={'regular16'}>
          Are you sure to delete user <strong>{currentUser?.userName}</strong>?
        </Typography>
      </div>
    </Modal>
  )
}
