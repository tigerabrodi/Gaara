import { createSignal } from 'solid-js'
import { AddIcon } from './icons/AddIcon'
import { EmojiIcon } from './icons/EmojiIcon'
import { GifIcon } from './icons/GifIcon'
import { ImageIcon } from './icons/ImageIcon'
import { ProgressCircle } from './components/ProgressCircle'
import { CloseIcon } from './icons/CloseIcon'

export const App = () => {
  const [tweetValue, setTweetValue] = createSignal('')
  const [avatarUrl, setAvatarUrl] = createSignal('')

  const onFileChange = (
    event: Event & {
      currentTarget: HTMLInputElement
      target: HTMLInputElement
    }
  ) => {
    const file = event.target.files ? event.target.files[0] : null

    if (!file) {
      throw new Error('You must upload a file...')
    }

    setAvatarUrl(window.URL.createObjectURL(file))
  }

  return (
    <main class="w-full min-h-full flex flex-col items-center bg-white">
      <h1 class="mt-12 text-navy text-6xl">Tweet UI</h1>
      <div class="bg-navy w-[600px] min-h-[280px] p-4 pt-5 rounded-xl shadow-sm shadow-gray-600 mt-8">
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
              value={tweetValue()}
              onInput={(event) =>
                setTweetValue((event.target as HTMLInputElement).value)
              }
            />
            {avatarUrl() && (
              <div class="w-full h-96 mt-2 relative">
                <img
                  src={avatarUrl()}
                  alt=""
                  class="rounded-3xl object-top object-cover w-full h-full"
                />
                <button
                  onClick={() => setAvatarUrl('')}
                  aria-label="Remove image"
                  class="w-8 h-8 flex items-center justify-center rounded-full absolute top-2 shadow-md shadow-black-300 left-2 bg-black-600 hover:bg-black-300 transition-all"
                >
                  <CloseIcon class="w-4 h-4 fill-white" />
                </button>
              </div>
            )}
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
            <button
              aria-label="Add Gif"
              class="w-9 h-9 items-center justify-center flex hover:cursor-pointer rounded-full hover:bg-blue-300 transition-all"
            >
              <GifIcon class="w-5 h-5 fill-blue-600" />
            </button>
            <button
              aria-label="Add Emoji"
              class="w-9 h-9 items-center justify-center flex hover:cursor-pointer rounded-full hover:bg-blue-300 transition-all"
            >
              <EmojiIcon class="w-5 h-5 fill-blue-600" />
            </button>
          </div>

          <div class="[grid-area:action-buttons] flex flex-row items-center mt-1 h-full w-full justify-between">
            {tweetValue() ? (
              <ProgressCircle tweetValue={tweetValue()} />
            ) : (
              <div class="w-5 h-5" />
            )}
            <div class="h-3/5 w-[1px] bg-gray-600"></div>
            <button
              class="rounded-full p-1 border border-gray-600"
              aria-label="Add thread"
            >
              <AddIcon class="w-4 h-4 fill-blue-600" />
            </button>

            <button class="bg-blue-600 text-white rounded-2xl px-3 py-1 font-semibold">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
