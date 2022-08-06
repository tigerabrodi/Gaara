import type { TweetInputType } from '../store'

import { CloseIcon } from '../icons/CloseIcon'
import { setTweets } from '../store'

export const ImageUpload = (props: {
  avatarUrl: string
  tweet: TweetInputType
}) => {
  const handleImageRemoval = () => setTweets(props.tweet.id, { imageUrl: '' })

  return (
    <div class="relative mt-2 h-96 w-full">
      <img
        src={props.avatarUrl}
        alt=""
        class="h-full w-full rounded-3xl object-cover object-top"
      />
      <button
        onClick={handleImageRemoval}
        aria-label="Remove image"
        class="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-black-600 shadow-md shadow-black-300 transition-all hover:bg-black-300"
      >
        <CloseIcon class="h-4 w-4 fill-white" />
      </button>
    </div>
  )
}
