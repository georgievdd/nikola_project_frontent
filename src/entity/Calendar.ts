export enum DayType {
  Holiday,
  Disabled,
}

export const dayStyle = {
  [DayType.Disabled]: 'date_disabled',
  [DayType.Holiday]: 'date_holiday',
}

export type CalendarState = Record<string, DayType[]>
