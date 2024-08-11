/* eslint-disable max-len */
import styles from './LabelInput.module.scss'

export const inputsConfig = [
  {
    label: 'Фамилия',
    placeholder: 'Иванов',
    required: true,
  },
  {
    label: 'Имя',
    placeholder: 'Иван',
    required: true,
  },
  {
    label: 'E-mail',
    placeholder: 'example@gmail.com',
    required: true,
  },
  {
    label: 'Контакт для связи',
    placeholder: 'Например "telegram: @username"',
    required: true,
  },
  {
    label: 'Комментарий',
    placeholder:
      // eslint-disable-next-line max-len
      'Например, здесь можно написать, что вам не удобно отвечать на звонки в рабочее время',
    className: styles.comment,
  },
]
