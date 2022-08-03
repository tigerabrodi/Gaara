const STROKE_DASH_OFFSET = 56.3467

const STROKE_SUCCESS_COLOR = '#1D9BF0'

const STROKE_WARNING_COLOR = '#FFD400'

const STROKE_ERROR_COLOR = '#F4212E'

const STROKE_BACKGROUND_COLOR = '#38444D'

export const ProgressCircleIcon = (props: {
  class: string
  strokeDashArray: number
}) => (
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
      stroke={STROKE_SUCCESS_COLOR}
      stroke-linecap="round"
      style={`stroke-dashoffset: ${STROKE_DASH_OFFSET}; stroke-dasharray: ${props.strokeDashArray};`}
    ></circle>
  </svg>
)
