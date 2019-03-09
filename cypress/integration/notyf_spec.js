/// <reference types="Cypress" />

context('Notyf', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Default behaviour', () => {
    it('should render the main container', () => {
      cy.get('.notyf');
    });
    
    it('should render a confirm notification', () => {
      cy.get('#confirm-btn').click();
      cy.get('.notyf__toast').should('have.class', 'notyf__toast--confirm');
    });
  
    it('should render an alert notification', () => {
      cy.get('#alert-btn').click();
      cy.get('.notyf__toast').should('have.class', 'notyf__toast--alert');
    });
  });

  describe('A11y', () => {
    it('should render the announcer', () => {
      cy.get('.notyf-announcer');
    });

    it('should announce the current notification', () => {
      const message = 'I love Notyf';
      cy.get('#message').type(message);
      cy.get('#alert-btn').click();
      cy.get('.notyf-announcer').should('have.text', message);
    });
  });

  describe('Custom options', () => {
    it('should render with a custom message', () => {
      const message = 'I love Notyf';
      cy.get('#message').type(message);
      cy.get('#alert-btn').click();
      cy.get('.notyf__message').should('have.text', message);
    });

    it('should remove the notification after the given delay', () => {
      const delay = 3000;
      cy.get('#delay').type(delay);
      cy.get('#alert-btn').click();
      cy.get('.notyf__toast', { timeout: 10 })
      cy.wait(delay + 1000); // we need to account 1000ms for the css animations to finish
      cy.get('.notyf__toast', { timeout: 10 }).should('not.exist');
    });

    it('should render with a custom alert icon', () => {
      const icon = 'foo-bar-icon';
      cy.get('#alert-icon').type(icon);
      cy.get('#alert-btn').click();
      cy.get('.notyf__icon')
        .find('i')
        .should('have.class', icon)
        .then(([$elem]) => expect($elem.classList.length).to.equal(1));
    });

    it('should render with a custom confirm icon', () => {
      const icon = 'foo-bar-icon';
      cy.get('#confirm-icon').type(icon);
      cy.get('#confirm-btn').click();
      cy.get('.notyf__icon')
        .find('i')
        .should('have.class', icon)
        .then(([$elem]) => expect($elem.classList.length).to.equal(1));
    });

  });
});
