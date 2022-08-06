import { createStore } from 'solid-js/store'

export const [tweets, setTweets] = createStore<TweetInputType[]>([
  { id: 0, text: '', imageUrl: '', isVisible: true },
])

export type TweetInputType = {
  id: number
  text: string
  imageUrl: string
  isVisible: boolean
}
