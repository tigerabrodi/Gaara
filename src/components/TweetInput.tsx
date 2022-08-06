import type { TweetInputType } from '../store'
import type { Emoji } from 'solid-emoji-picker'

import { EmojiPicker } from 'solid-emoji-picker'
import { createSignal, Show, Suspense } from 'solid-js'

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

export const TweetInput = (props: { tweet: TweetInputType }) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = createSignal(false)

  const onFileChange = (event: FileInputEvent) => {
    const file = event.target.files ? event.target.files[0] : null

    if (!file) {
      throw new Error('You must upload a file...')
    }

    const imageUrl = window.URL.createObjectURL(file)

    setTweets(props.tweet.id, { imageUrl })
  }

  function pickEmoji(emoji: Emoji) {
    setTweets(props.tweet.id, { text: props.tweet.text + emoji.emoji })
  }

  const toggleEmojiPicker = () => setIsEmojiPickerOpen(!isEmojiPickerOpen())

  const handleChange = (
    event: InputEvent & {
      target: HTMLTextAreaElement
      currentTarget: HTMLTextAreaElement
    }
  ) =>
    setTweets(props.tweet.id, {
      text: event.target.value,
    })

  const addNewThread = () => {
    const newId = props.tweet.id + 1

    setTweets(newId, { id: newId, text: '', imageUrl: '' })
  }

  const isLastThread = () => tweets[tweets.length - 1].id === props.tweet.id

  return (
    <div class="bg-navy w-[600px] min-h-[280px] p-4 pt-5 rounded-xl shadow-sm shadow-gray-600 mt-8 relative">
      <div class="grid-template-area-styles min-h-[250px]">
        <img
          src="/src/assets/naruto.jpg"
          alt="Naruto"
          class="[grid-area:img] rounded-full object-top object-cover w-12 h-12"
        />
        <div class="[grid-area:text-image] w-full border-b-gray-600 border-b min-h-[180px] pt-3 pb-2 flex flex-col items-center">
          <textarea
            class="bg-navy text-xl text-white placeholder:text-opacity-50 min-h-[180px] w-full pl-2 pr-1 resize-none  overflow-auto"
            placeholder="What's happening?"
            value={props.tweet.text}
            onInput={handleChange}
          />
          <Show when={props.tweet.imageUrl}>
            <ImageUpload avatarUrl={props.tweet.imageUrl} tweet={props.tweet} />
          </Show>
        </div>

        <div class="[grid-area:media-buttons] flex flex-row items-center [column-gap:16px] mt-1 h-full w-full">
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
            class="w-9 h-9 items-center justify-center flex hover:cursor-pointer rounded-full hover:bg-blue-300 transition-all"
          >
            <ImageIcon class="w-5 h-5 fill-blue-600" />
          </label>
          <Show when={isLastThread()} fallback={<div class="w-9 h-9" />}>
            <button
              aria-label="Add Emoji"
              class="w-9 h-9 items-center justify-center flex hover:cursor-pointer rounded-full hover:bg-blue-300 transition-all"
              onClick={toggleEmojiPicker}
            >
              <EmojiIcon class="w-5 h-5 fill-blue-600" />
            </button>
          </Show>
        </div>

        <div class="[grid-area:action-buttons] flex flex-row items-center mt-1 h-full w-full justify-between">
          <Show when={props.tweet.text} fallback={<div class="w-5 h-5" />}>
            <ProgressCircle tweetValue={props.tweet.text} />
          </Show>
          <div class="h-3/5 w-[1px] bg-gray-600"></div>
          <button
            class="rounded-full p-1 border border-gray-600"
            aria-label="Add thread"
            onClick={addNewThread}
          >
            <AddIcon class="w-4 h-4 fill-blue-600" />
          </button>

          <button class="bg-blue-600 text-white rounded-2xl px-3 py-1 font-semibold">
            Tweet
          </button>
        </div>
      </div>

      <Suspense fallback={<></>}>
        <Show when={isEmojiPickerOpen()}>
          <EmojiPicker onEmojiClick={pickEmoji} skinTone="medium" />
        </Show>
      </Suspense>
    </div>
  )
}
