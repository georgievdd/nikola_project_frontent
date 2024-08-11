import React from 'react'

import Link from 'next/link'

const s = require('src/helpers').importStyles(
  require('./NotFoundPage.module.scss'),
)
const NotFoundPage = () => {
  return (
    <div className={s`container`}>
      <div className={s`island`}>
        <h1 className={s`error-code`}>404</h1>
        <div className={s`text`}>
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
