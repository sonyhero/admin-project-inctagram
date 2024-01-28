export const getNumericDayMonthTime = (
  dateString: number | string,
  locale: string,
  addDay: boolean = false
) => {
  const date = new Date(dateString)

  if (addDay) {
    date.setDate(date.getDate() + 1)
  }
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  } as const

  return date.toLocaleDateString(locale, options)
}
