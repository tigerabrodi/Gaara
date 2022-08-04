import { STROKE_BACKGROUND_COLOR, STROKE_DASH_OFFSET } from '../constants'

export const ProgressCircleIcon = (props: {
  iconSize: string
  strokeWidth: string
  currentStrokeDashArray: number
  strokeColor: string
}) => {
  return (
    <svg
      viewBox="0 0 20 20"
      style="overflow: visible;"
      class={`${props.iconSize} -rotate-90 transition-all`}
    >
      <circle
        cx="50%"
        cy="50%"
        fill="none"
        stroke-width="2"
        r="9"
        stroke={STROKE_BACKGROUND_COLOR}
      ></circle>
      <circle
        cx="50%"
        cy="50%"
        fill="none"
        stroke-width={props.strokeWidth}
        r="9"
        stroke={props.strokeColor}
        stroke-linecap="round"
        style={`stroke-dashoffset: ${STROKE_DASH_OFFSET}; stroke-dasharray: ${props.currentStrokeDashArray};`}
      ></circle>
    </svg>
  )
}
