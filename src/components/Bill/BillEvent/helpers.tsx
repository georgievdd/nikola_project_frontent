import night from 'images/house-mini.svg'
import peoples from 'images/peoples.svg'
import promo from 'images/promo.svg'
import watch from 'images/watch.svg'

type Type =
  | 'early_check_in'
  | 'night'
  | 'extra_persons'
  | 'late_check_out'
  | 'promo_code'

export function getIconByType(type: string) {
  switch (type) {
    case 'early_check_in':
      return watch
    case 'night':
      return night
    case 'extra_persons':
      return peoples
    case 'late_check_out':
      return watch
    case 'promo_code':
      return promo
  }
}
