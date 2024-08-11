import {mutedStyle} from './common/styles'

export default function IconPlus({muted}: {muted?: boolean}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      style={muted ? mutedStyle : {}}
    >
      <rect width="18" height="18" rx="9" fill="#031F21" />
      <rect y="7.71429" width="18" height="2.57143" fill="#FFFEFB" />
    </svg>
  )
}
