import { createEffect, createSignal } from 'solid-js'
import {
  MAX_TOTAL_TWEET_CHARACTERS_LENGTH,
  STROKE_BACKGROUND_COLOR,
  STROKE_DASH_OFFSET,
  STROKE_ERROR_COLOR,
  STROKE_SUCCESS_COLOR,
  STROKE_WARNING_COLOR,
  MAX_TWEET_SUCCESS_CHARACTERS_LENGTH,
  END_STROKE_DASH_ARRAY,
  START_STROKE_DASH_ARRAY,
  INCREMENTAL_STROKE_VALUE_PER_CHARACTER,
} from '../constants'

export const ProgressCircleIcon = (props: {
  class: string
  tweetValue: string
}) => {
  const [strokeDashArray, setStrokeDashArray] = createSignal(
    START_STROKE_DASH_ARRAY
  )

  const shouldShowSuccessColor = () =>
    props.tweetValue.length < MAX_TWEET_SUCCESS_CHARACTERS_LENGTH
  const shouldShowWarningColor = () =>
    props.tweetValue.length < MAX_TOTAL_TWEET_CHARACTERS_LENGTH

  const shouldShowErrorColor = () =>
    props.tweetValue.length > MAX_TOTAL_TWEET_CHARACTERS_LENGTH

  const strokeColor = () =>
    shouldShowSuccessColor()
      ? STROKE_SUCCESS_COLOR
      : shouldShowWarningColor()
      ? STROKE_WARNING_COLOR
      : STROKE_ERROR_COLOR

  const currentStrokeDashArray = () =>
    shouldShowErrorColor() ? END_STROKE_DASH_ARRAY : strokeDashArray()

  createEffect(() => {
    const currentTweetValueLength = props.tweetValue.length
    const isTweetLessThanMaxCharacters =
      currentTweetValueLength <= MAX_TOTAL_TWEET_CHARACTERS_LENGTH

    if (props.tweetValue && isTweetLessThanMaxCharacters) {
      const newStrokeDashArrayPerCharacter =
        currentTweetValueLength * INCREMENTAL_STROKE_VALUE_PER_CHARACTER

      const newStrokeDashArray =
        newStrokeDashArrayPerCharacter + START_STROKE_DASH_ARRAY

      setStrokeDashArray(newStrokeDashArray)
    }
  })

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
        style={`stroke-dashoffset: ${STROKE_DASH_OFFSET}; stroke-dasharray: ${currentStrokeDashArray()};`}
      ></circle>
    </svg>
  )
}
