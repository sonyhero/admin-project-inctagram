import { LocaleType } from '@/shared/locales/en'
export const ru: LocaleType = {
  auth: {
    signIn: {
      email: 'Адрес электронной почты',
      emailPlaceholder: 'введите ваш адрес электронной почты',
      password: 'Пароль',
      passwordPlaceholder: 'введите ваш пароль',
      signIn: 'Войти',
      signInServerError:
        'Адрес электронной почты или пароль неверны. Попробуйте еще раз, пожалуйста',
    },
  },
  error404: {
    backToMain: 'Вернуться на главную',
    pageNotFound: 'Извините! Страница не найдена!',
  },
  header: {
    admin: 'Админ',
    en: 'English',
    inctagram: 'Инктаграм',
    ru: 'Русский',
    super: 'Супер',
  },
  metaDescription: 'Админ панель для приложения Инктаграм',
  sidebar: {
    paymentsList: 'Список платежей',
    postList: 'Список постов',
    statistics: 'Статистика',
    useList: 'Список пользователей',
  },
  user: {
    paymentsTable: {
      dateOfPayment: 'Дата платежа',
      endOfSubscriptions: 'Дата окончания подписки',
      paymentType: 'Тип оплаты',
      price: 'Стоимость',
      subscriptionType: 'Тип подписки',
    },
  },
  usersList: {
    dateAdded: 'Дата добавления',
    paginationSelect: {
      onPage: 'На Странице',
      show: 'Показать',
    },
    profileLink: 'Ссылка на профиль',
    search: 'Поиск',
    settingsTableDescription: {
      blocked: 'Заблокирован',
      notBlocked: 'Не заблокирован',
      notSelected: 'Не выбрано',
    },
    userId: 'ID пользователя',
    userName: 'Имя пользователя',
  },
}
