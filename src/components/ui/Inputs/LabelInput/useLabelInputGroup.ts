import { useLabelInput } from "./LabelInput"


interface LabelInput {
    placeholder: string
    label: string
    className?: string
    required?: boolean
}

export default function useLabelInputGroup(inputs: LabelInput[]) {
    const controllers = inputs.map(e => useLabelInput(e))
    const isValid = () => {
        let valid = true
        controllers.forEach((controller, idx) => {
            if (inputs[idx].required) {
                if (!controller.isValid) {
                    valid = false
                }
            }
        })
        return valid
    }
    return {
        controllers, 
        isValid
    }
}