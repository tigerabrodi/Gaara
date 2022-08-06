import type { TweetInputType } from '../store'
import type { Emoji } from 'solid-emoji-picker'

import { EmojiPicker } from 'solid-emoji-picker'
import { createSignal, Show, Suspense } from 'solid-js'

import NarutoImg from '../assets/naruto.jpg'
import { AddIcon } from '../icons/AddIcon'
import { EmojiIcon } from '../icons/EmojiIcon'
import { ImageIcon } from '../icons/ImageIcon'
import { tweets } from '../store'
import { setTweets } from '../store'
import { ImageUpload } from './ImageUpload'
import { ProgressCircle } from './ProgressCircle'

type FileInputEvent = Event & {
  currentTarget: HTMLInputElement
  target: HTMLInputElement
}

type TextareaEvent = InputEvent & {
  target: HTMLTextAreaElement
  currentTarget: HTMLTextAreaElement
}

export const TweetInput = (props: { tweet: TweetInputType }) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = createSignal(false)

  const onFileChange = (event: FileInputEvent) => {
    const file = event.target.files ? event.target.files[0] : null
    if (!file) {
      throw new Error('You must upload a image...')
    }

    const imageUrl = window.URL.createObjectURL(file)
    setTweets(props.tweet.id, { imageUrl })
  }

  function pickEmoji(emoji: Emoji) {
    setTweets(props.tweet.id, { text: props.tweet.text + emoji.emoji })
  }

  const toggleEmojiPicker = () => setIsEmojiPickerOpen(!isEmojiPickerOpen())

  const handleTextChange = (event: TextareaEvent) => {
    setTweets(props.tweet.id, {
      text: event.target.value,
    })
  }

  const addNewThread = () => {
    const newId = props.tweet.id + 1

    setTweets(props.tweet.id, {
      isVisible: false,
    })

    setTweets(newId, { id: newId, text: '', imageUrl: '', isVisible: true })

    const textareaElementId = `#textarea-${newId}`
    const textareaElement = document.querySelector(
      textareaElementId
    ) as HTMLTextAreaElement
    textareaElement.focus()
  }

  const lastTweetInput = tweets[tweets.length - 1]
  const shouldShowAddThreadButton = () => lastTweetInput.id === props.tweet.id

  const isCurrentTweetInputVisible = () => props.tweet.isVisible

  const handleVisiblityOfTweetInput = () => {
    // Only one visible tweet input at the time.
    const currentlyVisibleTweet = tweets.find((tweet) => tweet.isVisible)

    setTweets(currentlyVisibleTweet.id, { isVisible: false })
    setTweets(props.tweet.id, { isVisible: true })
  }

  return (
    <div
      class={`grid-template-area-styles ${
        isCurrentTweetInputVisible()
          ? 'min-h-[250px] opacity-100'
          : 'h-16 opacity-70'
      }`}
    >
      <img
        src={NarutoImg}
        alt="Naruto"
        class="h-12 w-12 rounded-full object-cover object-top [grid-area:img]"
      />
      <div
        class={`flex w-full flex-col items-center border-b border-b-gray-600 pt-3 pb-2 [grid-area:text-image] ${
          isCurrentTweetInputVisible() ? 'min-h-[180px]' : 'h-16'
        }`}
      >
        <textarea
          class={`w-full resize-none overflow-auto bg-navy pl-2 pr-1 text-xl text-white placeholder:text-opacity-50 ${
            isCurrentTweetInputVisible()
              ? 'min-h-[180px] opacity-100'
              : 'h-16 opacity-50'
          }`}
          placeholder="What's happening?"
          value={props.tweet.text}
          onInput={handleTextChange}
          id={`textarea-${props.tweet.id}`}
          onClick={handleVisiblityOfTweetInput}
        />
        <Show when={props.tweet.imageUrl && props.tweet.isVisible}>
          <ImageUpload avatarUrl={props.tweet.imageUrl} tweet={props.tweet} />
        </Show>
      </div>

      <Show when={isCurrentTweetInputVisible()} fallback={<div />}>
        <div class="mt-1 flex h-full w-full flex-row items-center [grid-area:media-buttons] [column-gap:16px]">
          <input
            id="upload-image"
            class="sr-only"
            type="file"
            accept="image/*"
            aria-label="Upload Image"
            onChange={onFileChange}
          />
          <label
            for="upload-image"
            class="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:cursor-pointer hover:bg-blue-300"
          >
            <ImageIcon class="h-5 w-5 fill-blue-600" />
          </label>
          <button
            aria-label="Add Emoji"
            class="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:cursor-pointer hover:bg-blue-300"
            onClick={toggleEmojiPicker}
          >
            <EmojiIcon class="h-5 w-5 fill-blue-600" />
          </button>
        </div>

        <div class="mt-1 flex h-full w-full flex-row items-center justify-between [grid-area:action-buttons]">
          <Show when={props.tweet.text} fallback={<div class="h-5 w-5" />}>
            <ProgressCircle tweetValue={props.tweet.text} />
          </Show>
          <div class="h-3/5 w-[1px] bg-gray-600"></div>

          <Show
            when={shouldShowAddThreadButton()}
            fallback={<div class="h-9 w-9" />}
          >
            <button
              class="rounded-full border border-gray-600 p-1"
              aria-label="Add thread"
              onClick={addNewThread}
            >
              <AddIcon class="h-4 w-4 fill-blue-600" />
            </button>
          </Show>

          <button class="rounded-2xl bg-blue-600 px-3 py-1 font-semibold text-white">
            Tweet
          </button>
        </div>
        <Suspense fallback={<></>}>
          <Show when={isEmojiPickerOpen()}>
            <EmojiPicker onEmojiClick={pickEmoji} skinTone="medium" />
          </Show>
        </Suspense>
      </Show>
    </div>
  )
}
