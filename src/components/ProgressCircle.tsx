import { createEffect, createSignal } from 'solid-js'
import {
  MAX_TOTAL_TWEET_CHARACTERS_LENGTH,
  STROKE_ERROR_COLOR,
  STROKE_SUCCESS_COLOR,
  STROKE_WARNING_COLOR,
  MAX_TWEET_SUCCESS_CHARACTERS_LENGTH,
  START_STROKE_DASH_ARRAY,
  INCREMENTAL_STROKE_VALUE_PER_CHARACTER,
  ERROR_STROKE_DASH_ARRAY,
} from '../constants'
import { ProgressCircleIcon } from '../icons/ProgressCircleIcon'

export const ProgressCircle = (props: { tweetValue: string }) => {
  const [strokeDashArray, setStrokeDashArray] = createSignal(
    START_STROKE_DASH_ARRAY
  )

  const shouldShowSuccessColor = () =>
    props.tweetValue.length < MAX_TWEET_SUCCESS_CHARACTERS_LENGTH
  const shouldShowWarningColor = () =>
    props.tweetValue.length < MAX_TOTAL_TWEET_CHARACTERS_LENGTH &&
    props.tweetValue.length >= MAX_TWEET_SUCCESS_CHARACTERS_LENGTH
  const shouldShowErrorColor = () =>
    props.tweetValue.length >= MAX_TOTAL_TWEET_CHARACTERS_LENGTH

  const strokeColor = () =>
    shouldShowSuccessColor()
      ? STROKE_SUCCESS_COLOR
      : shouldShowWarningColor()
      ? STROKE_WARNING_COLOR
      : STROKE_ERROR_COLOR

  const currentStrokeDashArray = () =>
    shouldShowErrorColor() ? ERROR_STROKE_DASH_ARRAY : strokeDashArray()

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

  const iconSize = () =>
    shouldShowWarningColor() || shouldShowErrorColor()
      ? `w-[35px] h-[35px]`
      : `w-5 h-5`

  const warningErrorText = () =>
    MAX_TOTAL_TWEET_CHARACTERS_LENGTH - props.tweetValue.length

  const displayOfNumberValidation = () =>
    props.tweetValue.length >= MAX_TWEET_SUCCESS_CHARACTERS_LENGTH
      ? 'block'
      : 'hidden'

  const strokeWidth = () =>
    shouldShowErrorColor() || shouldShowWarningColor() ? '1.5' : '2'

  return (
    <div class="relative">
      <ProgressCircleIcon
        iconSize={iconSize()}
        strokeWidth={strokeWidth()}
        strokeColor={strokeColor()}
        currentStrokeDashArray={currentStrokeDashArray()}
      />
      <p
        aria-hidden="true"
        class={`${displayOfNumberValidation()} text-gray-300 font-medium absolute text-sm -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2`}
      >
        {warningErrorText()}
      </p>
    </div>
  )
}
