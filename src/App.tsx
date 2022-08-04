import { createSignal } from 'solid-js'
import { AddIcon } from './icons/AddIcon'
import { EmojiIcon } from './icons/EmojiIcon'
import { GifIcon } from './icons/GifIcon'
import { ImageIcon } from './icons/ImageIcon'
import { ProgressCircleIcon } from './icons/ProgressCircleIcon'

export const App = () => {
  const [tweetValue, setTweetValue] = createSignal('')

  return (
    <main class="w-full min-h-full flex flex-col items-center bg-white">
      <h1 class="mt-12 text-navy text-6xl">Tweet UI</h1>
      <div class="bg-navy w-[600px] min-h-[280px] p-4 pt-5 rounded-xl shadow-sm shadow-gray-600 mt-8">
        <div class="grid-template-area-styles h-[250px]">
          <img
            src="/src/assets/naruto.jpg"
            alt="Naruto"
            class="[grid-area:img] rounded-full object-top object-cover w-12 h-12"
          />
          <textarea
            class="[grid-area:textarea] bg-navy text-xl text-white placeholder:text-opacity-50 min-h-[180px] w-full pt-[10px] pl-2 pr-1 resize-none border-b-gray-600 border-b overflow-auto"
            placeholder="What's happening?"
            value={tweetValue()}
            onInput={(event) =>
              setTweetValue((event.target as HTMLInputElement).value)
            }
          />

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
                tweetValue={tweetValue()}
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
