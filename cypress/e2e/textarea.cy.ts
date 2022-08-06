const textareaTexts = {
  first: 'this is the first',
  second: 'this is the second',
} as const

it('Should be able to write and add more threads', () => {
  cy.visit('/')

  cy.findByRole('textbox', { name: 'Enter tweet text' }).type(
    textareaTexts.first
  )

  cy.findByRole('img', { name: 'Naruto' }).should('exist')

  cy.findByRole('button', { name: 'Add thread' }).click()

  cy.findAllByRole('textbox', { name: 'Enter tweet text' })
    .eq(1)
    .should('have.focus')

  cy.findAllByRole('textbox', { name: 'Enter tweet text' })
    .eq(1)
    .type(textareaTexts.second)

  cy.findAllByRole('button', { name: 'Add thread' }).click()

  cy.findAllByRole('textbox', { name: 'Enter tweet text' })
    .eq(2)
    .should('have.text', '')
})
