import React from 'react'

import {extractId} from './helpers'

const css = require('src/helpers').importStyles(
  require('./NotFoundPage.module.scss'),
)

const NotFoundReservationPage = () => {
  const id = extractId()
  return (
    <div className={css`container`}>
      <div className={css`island`}>
        <h1 className={css`error-code`}>404</h1>
        <div className={css`text`}>
          <h1>Заявки с идентификатором {id} не существует</h1>
        </div>
      </div>
    </div>
  )
}

export default NotFoundReservationPage
