import { For } from 'solid-js'

import { TweetInput } from './components/TweetInput'
import { tweets } from './store'

export const App = () => {
  return (
    <main class="flex min-h-full w-full flex-col items-center bg-white">
      <h1 class="mt-12 text-6xl text-navy">Gaara</h1>

      <div class="relative mt-8 min-h-[280px] w-[600px] rounded-xl bg-navy p-4 pt-5 shadow-sm shadow-gray-600">
        <For each={tweets}>{(tweet) => <TweetInput tweet={tweet} />}</For>
      </div>
    </main>
  )
}
