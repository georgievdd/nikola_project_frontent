import React from 'react'

import {extractUrl} from './helpers'

const css = require('src/helpers').importStyles(
  require('./NotFoundPage.module.scss'),
)

const NotFoundPage = () => {
  const url = extractUrl()
  return (
    <div className={css`container`}>
      <div className={css`island`}>
        <h1 className={css`error-code`}>404</h1>
        <div className={css`text`}>
          <h1>Страницы {url} не существует</h1>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
