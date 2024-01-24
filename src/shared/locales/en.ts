export type LocaleType = typeof en

export const en = {
  auth: {
    signIn: {
      email: 'Email',
      emailPlaceholder: 'enter your email',
      password: 'Password',
      passwordPlaceholder: 'enter your password',
      signIn: 'Sign In',
      signInServerError: 'The email or password are incorrect. Try again please',
    },
  },
  error404: {
    backToMain: 'Back to main',
    pageNotFound: 'Sorry! Page not found!',
  },
  header: {
    admin: 'Admin',
    en: 'English',
    inctagram: 'Inctagram',
    ru: 'Русский',
    super: 'Super',
  },
  metaDescription: 'Admin panel for app Inсtagram ',
  sidebar: {
    paymentsList: 'Payments list',
    postList: 'Post list',
    statistics: 'Statistics',
    useList: 'User list',
  },
  user: {
    paymentsTable: {
      dateOfPayment: 'Date of Payment',
      endOfSubscriptions: 'End date of subscription',
      paymentType: 'Payment Type',
      price: 'Price',
      subscriptionType: 'Subscription Type',
    },
  },
  usersList: {
    dateAdded: 'Date added',
    paginationSelect: {
      onPage: 'On page',
      show: 'Show',
    },
    profileLink: 'Profile link',
    search: 'Search',
    settingsTableDescription: {
      blocked: 'Blocked',
      notBlocked: 'Not bBocked',
      notSelected: 'Not selected',
    },
    userId: 'User ID',
    userName: 'Username',
  },
}
