import { createStore } from 'solid-js/store'

export const [tweets, setTweets] = createStore<TweetInputType[]>([
  { id: 0, text: '', imageUrl: '' },
])

export type TweetInputType = {
  id: number
  text: string
  imageUrl: string
}
