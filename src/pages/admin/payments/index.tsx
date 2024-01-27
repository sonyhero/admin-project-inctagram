import React from 'react'

import { PaymentsList } from '@/entities/payments-list'
import { getBaseLayout } from '@/shared'

const PaymentsPage = () => {
  return <PaymentsList />
}

export default PaymentsPage
PaymentsPage.getLayout = getBaseLayout
