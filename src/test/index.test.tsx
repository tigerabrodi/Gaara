import matchers from '@testing-library/jest-dom/matchers'
import { render, screen } from 'solid-testing-library'
import { expect, it } from 'vitest'

import { App } from '../App'

expect.extend(matchers)

it('Is able to use tweet input', () => {
  render(() => <App />)
  expect(
    screen.getByRole('textbox', { name: 'Enter tweet' })
  ).toBeInTheDocument()
})
