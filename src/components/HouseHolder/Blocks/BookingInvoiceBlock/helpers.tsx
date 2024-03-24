import watch from '../../../../../public/images/watch.svg'
import night from '../../../../../public/images/house-mini.svg'
import peoples from '../../../../../public/images/peoples.svg'


type Type = 
'early_check_in' | 
'night' |
'extra_persons'

export function getIconByType(type: string) {
    switch (type) {
        case 'early_check_in':
            return watch
        case 'night':
            return night
        case 'extra_persons':
            return peoples
    }
}