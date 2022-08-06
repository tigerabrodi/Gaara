import type { TweetInputType } from '../store'

import { CloseIcon } from '../icons/CloseIcon'
import { setTweets } from '../store'

export const ImageUpload = (props: {
  avatarUrl: string
  tweet: TweetInputType
}) => {
  return (
    <div class="w-full h-96 mt-2 relative">
      <img
        src={props.avatarUrl}
        alt=""
        class="rounded-3xl object-top object-cover w-full h-full"
      />
      <button
        onClick={() => setTweets(props.tweet.id, { imageUrl: '' })}
        aria-label="Remove image"
        class="w-8 h-8 flex items-center justify-center rounded-full absolute top-2 shadow-md shadow-black-300 left-2 bg-black-600 hover:bg-black-300 transition-all"
      >
        <CloseIcon class="w-4 h-4 fill-white" />
      </button>
    </div>
  )
}
