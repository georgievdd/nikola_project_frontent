import { useEffect, useState } from "react"
import { debounce } from "lodash"
import styles from './LabelInput.module.scss'

export interface LabelInputController {
    label: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    isValid: boolean
    required?: boolean
    type?: string
}

export const useLabelInput = ({
    label,
    placeholder,
    className,
    type
}: {
    label: string
    placeholder: string
    className?: string
    type?: string
}): LabelInputController => {
    const [value, setValue] = useState('')

    return {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        placeholder,
        label,
        className,
        isValid: !!value,
        type
    }
}

interface LabelInput {
    placeholder: string
    label: string
    className?: string
    required?: boolean
}

export function useLabelInputGroup() {
    const inputs = inputsConfig
    const controllers = inputs.map(e => useLabelInput(e))
    const [isValid, setIsValid] = useState(false)
    const callback = debounce(() => {
        let valid = true
        controllers.forEach((controller, idx) => {
            if (inputs[idx].required) {
                if (!controller.isValid) {
                    valid = false
                }
            }
        })
        setIsValid(prev => valid)
    }, 100)
    useEffect(() => {
        callback()
    }, [controllers.map(controller => controller.value)])

    return {
        controllers, 
        isValid
    }
}

const inputsConfig = [
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
      placeholder: 'Например, здесь можно написать, что вам не удобно отвечать на звонки в рабочее время',
      className: styles.comment,
    },
  ]