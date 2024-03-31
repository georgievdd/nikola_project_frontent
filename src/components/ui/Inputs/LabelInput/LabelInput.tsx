import styles from './LabelInput.module.scss'
import { LabelInputController } from './useLabelInput'



const LabelInput = ({controller, className}: 
  {controller: LabelInputController, className?: string}) => {
  return (
    <div className={[styles.container, controller.className, className].join(' ')}>
      <h3>{controller.label}</h3>
      <input 
        value={controller.value}
        onChange={controller.onChange}
        placeholder={controller.placeholder}
        type={controller.type}
      />
    </div>
  )
}

export default LabelInput