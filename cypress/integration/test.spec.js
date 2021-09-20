// In first argument provide element you're currently testing, for example Home page
describe('Home page', () => {

  // This code will be called before each it(), you can use it reset database connection etc.
  beforeEach(() => {

  })

  // In first argument provide functionality you want to test
  it('Renders title', () => {

    // By addding baseUrl to cypress.json config you dont have to specify it again and again
    cy.visit('/')
    // but when you add http/https before your url you can access another website
    cy.visit('https://www.google.com')

    // Reload the page
    cy.reload()

    // Wait certain time
    cy.wait(500)

    // Cypress in here is case sensitive, 'Dice game' would fail
    cy.get('h2.logo__title').contains('Dice Game')

    // Using this you can run system commands
    cy.exec('npm run dev && rails s')

    // Use this if you want to make HTTP request
    cy.request('POST', '/api/v1/clients', {
      name: 'Arthur'
    })

    // We can get access of response data
    // In this block scope this.selectedUser will have a body from response
    cy.request('GET', '/api/v1/clients/1')
      .its('body')
      .as('selectedUser')
    
    // You can press ENTER by 
    cy.get('input[name=password]').type('{enter}')

    // Check if we have cookie
    cy.getCookie('your-session-cookie').should('exist')
    // Clear cookies
    cy.clearCookies()

    // ! NOTE - do not use UI to login each time, just send a request and then test some functionality that depends on it
    // So instead of doing this
    cy.visit('/login')
    cy.get('input[name=usermane]').type('daniel123')
    cy.get('input[name=password]').type('password1234{enter}')
    cy.visit('/dashboard')

    // Do this
    cy.request('POST', '/login', {
      username,
      password,
    })
    cy.visit('/dashboard')

    // Give an element 10 seconds to appear
    cy.get('.my-slow-selector', { timeout: 10000 })

    // To interact with elements first of all you .get() the element then trigger event
    .blur()
    .focus()
    .clear() // Clear value of DOM element
    .check() // Check the checkbox
    .uncheck() // Uncheck the checkbox
    .select() // Select an option from select
    .dblclick() // Double click DOM element
    .rightclick() // Right click DOM element

    // Using then we can create custom functions to handle logic
    cy.get('#some-link')
      .then(element => {
        // element is a DOM element

        const href = element.prop('href')
        // Side note, this REGEX removes 'hash' character from link
        return href.replace(/(#.*)/, '')
      })
      .then(href => {
        // As in previous .then function we returned href
        // Now we can use it as an argument
      })
    
    // You can assign an element to alias and use it later
    cy.get('my-selector')
      .as('myElement') // this is the alias
      .click()
    
    cy.get('@myElement')
      .click()
    
    // ! Remember that all Cypress commands are asynchronous, to work with synchronous such as Cypress.$() code, use .then()

    // Check if element has a class
    cy.get('button').click().should('have.class', 'active')
    // Check if element doesn't exist (after a functionality)
    cy.get('button.close').click().should('not.exist')
    cy.get('#modal').should('not.exist')
    // Check if element is visible and contain text
    cy.get('.mobile-nav').should('be.visible').and('contain', 'Home')
    // Chain assertions
    cy.get('#header a')
      .should('have.class', 'active')
      .and('have.attr', 'href', '/users')
  })
})


describe('My first test', () => {
  // First simple test
  it('Does not that much!', () => {
    expect(true).to.equal(true)
  })
  it('Visit on a page', () => {
    // How to visit on a page
    cy.visit('https://example.cypress.io')

    // How to check if elements contains an text object
    cy.contains('type')

    // How to click on an objects
    cy.contains('type').click()

    // How to pause tests, something like breakpoint in debugg tools
    cy.pause()

    // Check if URL has changed
    cy.url().should('include', 'ands/actions')

    // Get input element, type into it, get value from it
    // .get() method is based here on CSS selector
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})
