import { useState } from 'react'

import { useLoginMutation } from '@/features/auth/authApi.generated'
import { PATH, useSessionStorage, useTranslation } from '@/shared'
import { Button, Card, TextField, Typography } from '@belozerov-egor/ui-libs'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import s from './SignIn.module.scss'

export const SignIn = () => {
  const { t } = useTranslation()
  const [, setAuthToken] = useSessionStorage<string>('authToken')
  const [, setIsLoggedIn] = useSessionStorage<boolean>('isLoggedIn')
  const router = useRouter()
  const [signInForm, setSignInForm] = useState({ email: 'admin@gmail.com', password: 'admin' })
  const [errorMessage, setErrorMessage] = useState('')
  const [loginMutation] = useLoginMutation()
  const onChangeTextHandler = (value: string, name: string) => {
    setErrorMessage('')
    setSignInForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  const onSubmitHandler = async () => {
    if (signInForm.email === 'admin@gmail.com' && signInForm.password === 'admin') {
      NProgress.start()
      try {
        const response = await loginMutation({
          variables: {
            email: signInForm.email,
            password: signInForm.password,
          },
        })

        if (response.data?.loginAdmin.logged) {
          const base64 = btoa(`${signInForm.email}:${signInForm.password}`)

          setAuthToken(base64)
          setIsLoggedIn(response.data?.loginAdmin.logged)
          await router.push(PATH.USERS)
          NProgress.done()
        }
      } catch (error) {
        console.log(error)
        NProgress.done()
      }
    } else {
      setErrorMessage(t.auth.signIn.signInServerError)
    }
  }

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'h1'}>
        {t.auth.signIn.signIn}
      </Typography>
      <div>
        <TextField
          className={s.email}
          errorMessage={errorMessage}
          label={t.auth.signIn.email}
          onChangeText={e => onChangeTextHandler(e, 'email')}
          placeholder={t.auth.signIn.emailPlaceholder}
          requiredField
          type={'default'}
          value={signInForm.email}
        />
        <TextField
          className={s.password}
          errorMessage={errorMessage}
          label={t.auth.signIn.password}
          onChangeText={e => onChangeTextHandler(e, 'password')}
          placeholder={t.auth.signIn.passwordPlaceholder}
          requiredField
          type={'password'}
          value={signInForm.password}
        />
        <Button className={s.submit} fullWidth onClick={onSubmitHandler} type={'submit'}>
          <Typography variant={'h3'}>{t.auth.signIn.signIn}</Typography>
        </Button>
      </div>
    </Card>
  )
}
