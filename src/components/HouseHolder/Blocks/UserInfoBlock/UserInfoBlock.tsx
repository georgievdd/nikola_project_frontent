'use client'
import LabelInput, { LabelInputController, useLabelInput } from '@/components/ui/Inputs/LabelInput/LabelInput'
import styles from './UserInfoBlock.module.scss'

const UserInfoBlock = ({inputGroup}: {inputGroup: LabelInputController[]}) => {
  /**
   * refact last input
   */
  return (
    <section className={styles.container}>
      <h2>Контактная информация</h2>
      <form>
        {inputGroup.map((controller, i) => 
          <LabelInput className={i == 4 ? styles.comment : styles.userinfo} controller={controller}/>
        )}
      </form>
    </section>
  )
}

export default UserInfoBlock