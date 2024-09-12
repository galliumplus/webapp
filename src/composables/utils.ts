import Config from '@/config'
import dayjs from '@hokaze/dayjs'

export function useCurrentSchoolYear(): string {
  const [day, month] = Config.START_OF_SCHOOL_YEAR.split('-')
  const now = dayjs()
  const startOfSchoolYear = now.month(parseInt(month) - 1).date(parseInt(day))

  return startOfSchoolYear.isAfter(now, 'date')
    ? `${now.year() - 1}–${now.year()}`
    : `${now.year()}–${now.year() + 1}`
}
