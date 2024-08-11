import {Dispatch, useState} from 'react'

import {DateOrNull} from 'Calendar/CalendarBody/helpers'

export interface SelectionController {
  dateBegin: DateOrNull
  dateEnd: DateOrNull
  isActive: Boolean
  isStart: Boolean
  setDateBegin: Dispatch<DateOrNull>
  setDateEnd: Dispatch<DateOrNull>
  clear: () => void
}

export function useSelection(
  dateBeginInit?: Date,
  dateEndInit?: Date,
): SelectionController {
  const [dateBegin, setDateBegin] = useState(dateBeginInit || null)
  const [dateEnd, setDateEnd] = useState(dateEndInit || null)
  const clear = () => {
    setDateBegin(null)
    setDateEnd(null)
  }
  return {
    dateBegin,
    setDateBegin,
    dateEnd,
    setDateEnd,
    isActive: !!(dateBegin && dateEnd),
    isStart: !!(dateBegin && !dateEnd),
    clear,
  }
}
