'use client'
import LabelInput from 'components/ui/Inputs/LabelInput/LabelInput'
import {LabelInputController} from 'components/ui/Inputs/LabelInput/useLabelInput'

import styles from './UserInfoBlock.module.scss'

const UserInfoBlock = ({inputGroup}: {inputGroup: LabelInputController[]}) => {
  /**
   * refact last input
   */
  return (
    <section className={styles.container}>
      <h2>Контактная информация</h2>
      <form>
        {inputGroup.map((controller, i) => (
          <LabelInput
            key={controller.label}
            className={i == 4 ? styles.comment : styles.userinfo}
            controller={controller}
          />
        ))}
      </form>
    </section>
  )
}

export default UserInfoBlock
