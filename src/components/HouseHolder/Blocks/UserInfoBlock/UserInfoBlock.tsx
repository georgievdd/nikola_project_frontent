'use client'
import LabelInput, { LabelInputController, useLabelInput } from '@/components/ui/Inputs/LabelInput/LabelInput'
import styles from './UserInfoBlock.module.scss'
import useLabelInputGroup from '@/components/ui/Inputs/LabelInput/useLabelInputGroup'

const UserInfoBlock = ({inputGroup}: {inputGroup: LabelInputController[]}) => {
  /**
   * refact last input
   */
  return (
    <section className={styles.container}>
      <h2>Контактная информация</h2>
      <form>
        {inputGroup.map(controller => 
          <LabelInput controller={controller}/>
        )}
      </form>
    </section>
  )
}

export default UserInfoBlock