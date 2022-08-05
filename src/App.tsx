import { For } from 'solid-js'

import { TweetInput } from './components/TweetInput'
import { tweets } from './store'

export const App = () => {
  return (
    <main class="w-full min-h-full flex flex-col items-center bg-white">
      <h1 class="mt-12 text-navy text-6xl">Tweet UI</h1>
      <For each={tweets}>{(tweet) => <TweetInput tweet={tweet} />}</For>
    </main>
  )
}
