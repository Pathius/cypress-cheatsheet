// In first argument provide element you're currently testing, for example 'Home page'
describe('Home page', () => {

  // This code will be called before each it(), you can use it reset database connection etc.
  beforeEach(() => {

  })

  // In first argument provide functionality you want to test
  it('renders navigation', () => {

    //* TEST MANAGEMENT

    // Pause a test, works like an breakpoint
    cy.pause()

    // Wait certain amount of time
    cy.wait(500)

    // Execute terminal commands
    cy.exec('npm run dev && rails s')


    //* BROWSER/PAGE MANAGEMENT

    // Visit a page
    cy.visit('https://www.google.com')

    // Adding baseUrl to cypress.json allows you to specify only endpoint
    cy.visit('/')

    // Reload the page
    cy.reload()


    //* HTTP REQUEST

    // Send HTTP request
    cy.request('POST', '/api/v1/clients', { name: 'Arthur' })

    // Send HTTP request and assign response to variable - this.selectedUser
    cy.request('GET', '/api/v1/clients/1')
      .its('body')
      .as('selectedUser')

    
    //* Cookies

    // Check if coockie exists
    cy.getCookie('your-session-cookie').should('exist')

    // Clear cookies
    cy.clearCookies()


    //* DOM Elements

    // Check if page contains element with text
    cy.contains('type')

    // Click on an element
    cy.contains('type').click()

    // Different element events
    .blur()
    .focus()
    .type()
    .type('{enter}') // Press keyboard key
    .clear() // Clear value of DOM element
    .check() // Check the checkbox
    .uncheck() // Uncheck the checkbox
    .select() // Select an option from select
    .dblclick() // Double click DOM element
    .rightclick() // Right click DOM element
    
    // Get element based on CSS selector
    cy.get('.action-email')
      
    // Get element with timeout to appear
    cy.get('.my-slow-selector', { timeout: 10000 })
      
    // Get element and assign it to alias
    cy.get('my-selector')
      .as('myElement') // this is the alias
      .click()

    // Get element with alias
    cy.get('@myElement')
      .click()

    // Different .should assertions
    .should('have.value', 'fake@email.com') // Check if value is equal to second argument
    .should('have.class', 'active')
    .should('have.attr', 'href', '/users')
    .should('not.exist')
    .should('be.visible')
    .should('contain', 'Home') // Contain text
      
    // Chain assertions
    .should('have.class', 'active')
    .and('have.attr', 'href', '/users')
    

    //! IMPORTANT NOTES

    //* Do not use UI to complete some functionality each time (for example login), instead just write the code

    // Bad way
    cy.visit('/login')
    cy.get('input[name=usermane]').type('daniel123')
    cy.get('input[name=password]').type('password1234{enter}')
    cy.visit('/dashboard')

    // Good way
    cy.request('POST', '/login', { username, password })
    cy.visit('/dashboard')


    //* You can create custom functions using .then()
    //* You have to remember that's necessary as all Cypress commands run asynchronous
    cy.get('#some-link')
      .then(element => {
        // element variable is referring to a DOM element
        const href = element.prop('href')
        return href.replace(/(#.*)/, '')
      })
      .then(href => {
        // returned element in previous .then() can be used as an argument
      })
  })
})
