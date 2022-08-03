import { createEffect, createSignal } from 'solid-js'
import { AddIcon } from './icons/AddIcon'
import { EmojiIcon } from './icons/EmojiIcon'
import { GifIcon } from './icons/GifIcon'
import { ImageIcon } from './icons/ImageIcon'
import { ProgressCircleIcon } from './icons/ProgressCircleIcon'

const MAX_CHARACTERS = 280

const START_STROKE_DASH_ARRAY = 56.5487

const END_STROKE_DASH_ARRAY = 111

const TOTAL_STROKE_DASH_ARRAY_DURATION =
  END_STROKE_DASH_ARRAY - START_STROKE_DASH_ARRAY

const INCREMENTAL_STROKE_VALUE_PER_CHARACTER =
  TOTAL_STROKE_DASH_ARRAY_DURATION / MAX_CHARACTERS

export const App = () => {
  const [tweetValue, setTweetValue] = createSignal('')
  const [strokeDashArray, setStrokeDashArray] = createSignal(
    START_STROKE_DASH_ARRAY
  )

  function placeCaretAfterNode(spanTextareaNode: HTMLSpanElement) {
    const range = document.createRange()
    range.setStartAfter(spanTextareaNode)
    range.collapse(true)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)

    console.log({ selection, range })
  }

  createEffect(() => {
    if (tweetValue()) {
      setTimeout(() => {
        placeCaretAfterNode(spanTextareaRef)
      }, 300)
      spanTextareaRef.focus()
    }

    if (tweetValue() && tweetValue().length <= MAX_CHARACTERS) {
      const newStrokeDashArrayPerCharacter =
        tweetValue().length * INCREMENTAL_STROKE_VALUE_PER_CHARACTER

      const newStrokeDashArray =
        newStrokeDashArrayPerCharacter + START_STROKE_DASH_ARRAY

      setStrokeDashArray(newStrokeDashArray)
    }
  })

  let spanTextareaRef: HTMLSpanElement

  return (
    <main class="w-full min-h-full flex flex-col items-center bg-white">
      <h1 class="mt-12 text-navy text-6xl">Tweet UI</h1>
      <div class="bg-navy w-[600px] min-h-[265px] pb-1 px-4 pt-5 rounded-xl shadow-sm shadow-gray-600 mt-8">
        <div class="grid-template-area-styles min-h-[230px]">
          <img
            src="/src/assets/naruto.jpg"
            alt="Naruto"
            class="[grid-area:img] rounded-full object-top object-cover w-12 h-12"
          />
          <span
            role="textbox"
            contenteditable
            class="[grid-area:textarea] bg-navy text-xl text-white min-h-[180px] w-full pt-[10px] pl-2 resize-none border-b-gray-600 border-b"
            // @ts-ignore
            placeholder="What's happening?"
            ref={spanTextareaRef}
            onInput={(event) => {
              console.log(event)
              if (event.data) {
                setTweetValue(event.target.textContent)
              }
              spanTextareaRef.click()
              spanTextareaRef.focus()
            }}
          >
            {tweetValue()}
          </span>

          <div class="[grid-area:media-buttons] flex flex-row items-center [column-gap:16px] mt-1 h-full w-full">
            <button
              aria-label="Add Image"
              class="w-9 h-9 place-items-center flex"
            >
              <ImageIcon class="w-5 h-5 fill-blue" />
            </button>
            <button
              aria-label="Add Gif"
              class="w-9 h-9 place-items-center flex"
            >
              <GifIcon class="w-5 h-5 fill-blue" />
            </button>
            <button
              aria-label="Add Emoji"
              class="w-9 h-9 place-items-center flex"
            >
              <EmojiIcon class="w-5 h-5 fill-blue" />
            </button>
          </div>

          <div class="[grid-area:action-buttons] flex flex-row items-center mt-1 h-full w-full justify-between">
            {tweetValue() ? (
              <ProgressCircleIcon
                class="w-5 h-5 -rotate-90"
                strokeDashArray={strokeDashArray()}
              />
            ) : (
              <div class="w-5 h-5" />
            )}
            <div class="h-3/5 w-[1px] bg-gray-600"></div>
            <button
              class="rounded-full p-1 border border-gray-600"
              aria-label="Add thread"
            >
              <AddIcon class="w-4 h-4 fill-blue" />
            </button>

            <button class="bg-blue text-white rounded-2xl px-3 py-1 font-semibold">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
