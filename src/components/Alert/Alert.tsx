'use client'

import React from 'react'

import Image from 'next/image'
import {createRoot, Root} from 'react-dom/client'

import Cross from 'images/cross.svg'

const css = require('src/helpers').importStyles(require('./Alert.module.scss'))

type Variant = 'alert-danger' | 'alert-success'
interface Props {
  message: string
  variant: Variant
}

let alertContainer: HTMLDivElement | null = null
let root: Root | null = null

if (typeof window !== 'undefined') {
  alertContainer = document.createElement('div')
  root = createRoot(alertContainer)
}

const removeAlert = () => {
  root!.unmount()
  document.body?.removeChild(alertContainer!)
}
const mountAlert = (message: string, variant: Variant) => {
  root!.render(<Alert message={message} variant={variant} />)
  document.body?.appendChild(alertContainer!)
}

const Alert = ({message, variant}: Props) => (
  <div
    className={css`
      ${variant}
    `}
    onClick={removeAlert}
  >
    <Image
      quality={100}
      className={css`cross`}
      src={Cross}
      alt="cross"
      width={20}
      height={20}
    />
    {message}
  </div>
)

export const showAlert = (
  message: string,
  variant: 'alert-danger' | 'alert-success' = 'alert-danger',
) => {
  mountAlert(message, variant)
  setTimeout(() => {
    removeAlert()
  }, 8000)
}
