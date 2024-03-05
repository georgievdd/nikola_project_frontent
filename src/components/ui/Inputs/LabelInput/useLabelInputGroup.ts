import { useLabelInput } from "./LabelInput"


interface LabelInput {
    placeholder: string
    label: string
    className?: string
}

export default function useLabelInputGroup(inputs: LabelInput[]) {
    const controllers = inputs.map(e => useLabelInput(e))
    return controllers
}