import { Setter } from 'solid-js'
import { CloseIcon } from '../icons/CloseIcon'

export const ImageUpload = (props: {
  avatarUrl: string
  setAvatarUrl: Setter<string>
}) => {
  return (
    <div class="w-full h-96 mt-2 relative">
      <img
        src={props.avatarUrl}
        alt=""
        class="rounded-3xl object-top object-cover w-full h-full"
      />
      <button
        onClick={() => props.setAvatarUrl('')}
        aria-label="Remove image"
        class="w-8 h-8 flex items-center justify-center rounded-full absolute top-2 shadow-md shadow-black-300 left-2 bg-black-600 hover:bg-black-300 transition-all"
      >
        <CloseIcon class="w-4 h-4 fill-white" />
      </button>
    </div>
  )
}
