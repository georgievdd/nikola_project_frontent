import React from 'react'

import Link from 'next/link'

const css = require('src/helpers').importStyles(
  require('./NotFoundPage.module.scss'),
)
const NotFoundPage = () => {
  return (
    <div className={css`container`}>
      <div className={css`island`}>
        <h1 className={css`error-code`}>404</h1>
        <div className={css`text`}>
          <h1>Увы, такой страницы нет</h1>
          <h1>
            Попробуйте вернуться на <Link href={'/'}>главную</Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
