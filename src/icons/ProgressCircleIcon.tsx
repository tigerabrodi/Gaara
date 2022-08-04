import {
  MAX_CHARACTERS_LENGTH,
  STROKE_BACKGROUND_COLOR,
  STROKE_DASH_OFFSET,
  STROKE_ERROR_COLOR,
  STROKE_SUCCESS_COLOR,
  STROKE_WARNING_COLOR,
  SUCCESS_CHARACTERS_LENGTH,
} from '../constants'

export const ProgressCircleIcon = (props: {
  class: string
  strokeDashArray: number
  tweetValue: string
}) => {
  const shouldShowSuccessColor = () =>
    props.tweetValue.length < SUCCESS_CHARACTERS_LENGTH
  const shouldShowWarningColor = () =>
    props.tweetValue.length < MAX_CHARACTERS_LENGTH

  const strokeColor = () =>
    shouldShowSuccessColor()
      ? STROKE_SUCCESS_COLOR
      : shouldShowWarningColor()
      ? STROKE_WARNING_COLOR
      : STROKE_ERROR_COLOR

  return (
    <svg
      height="100%"
      viewBox="0 0 20 20"
      width="100%"
      style="overflow: visible;"
      class={props.class}
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
        stroke-width="2"
        r="9"
        stroke={strokeColor()}
        stroke-linecap="round"
        style={`stroke-dashoffset: ${STROKE_DASH_OFFSET}; stroke-dasharray: ${props.strokeDashArray};`}
      ></circle>
    </svg>
  )
}
