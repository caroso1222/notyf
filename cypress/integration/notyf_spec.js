/// <reference types="Cypress" />

context('Notyf', () => {

  function init(config) {
    if (config) {
      typeCode(config);
    }
    cy.get('#init-btn').click();
  }

  function typeCode(obj) {
    cy.get('#code').type(JSON.stringify(obj).replace(new RegExp('{', 'g'), '{{}'), {delay: 0});
  }

  const VIEWPORT_WIDTH = 800;
  const VIEWPORT_HEIGHT = 800;

  beforeEach(() => {
    cy.visit('/');
    cy.viewport(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  });

  describe('Default behaviour', () => {
    beforeEach(() => init());

    it('should render the main container', () => {
      cy.get('.notyf');
    });

    it('should render a success notification', () => {
      cy.get('#success-btn').click();
      cy.get('.notyf__toast').should('have.class', 'notyf__toast--success');
    });

    it('should render an error notification', () => {
      cy.get('#error-btn').click();
      cy.get('.notyf__toast').should('have.class', 'notyf__toast--error');
    });

    it('should render the notification with ripple', () => {
      cy.get('#error-btn').click();
      cy.get('.notyf__ripple');
    });

    it('should position the notification at the bottom right by default.', () => {
      cy.get('#success-btn').click();
      cy.get('.notyf__toast').then(button => {
        const pos = button.position();
        expect(pos.left).to.be.greaterThan(VIEWPORT_WIDTH/2)
        expect(pos.top).to.be.greaterThan(VIEWPORT_HEIGHT/2)
      });
    });

  });

  describe('Global custom configuration', () => {
    it('should disable ripple', () => {
      const config = { ripple: false };
      init(config);
      cy.get('#error-btn').click();
      cy.get('.notyf__ripple', { timeout: 10 }).should('not.exist');
    });

    it('should set the global duration', () => {
      const duration = 3000;
      const config = { duration };
      init(config);
      cy.get('#error-btn').click();
      cy.get('.notyf__toast', { timeout: 10 });
      cy.wait(duration + 1500); // we need to account roughly 1500ms for the css animations to finish
      cy.get('.notyf__toast', { timeout: 10 }).should('not.exist');
    });

    describe('Positioning', () => {

      function openAt({x, y}) {
        const config = { position: { x, y } };
        init(config);
        cy.get('#success-btn').click();
      }
      
      it('should position the notification at the top left', () => {
        openAt({ x: 'left', y: 'top' });
        cy.get('.notyf__toast').then(button => {
          const { left, top } = button.position();
          expect(left).to.be.lessThan(VIEWPORT_WIDTH / 2)
          expect(top).to.be.lessThan(VIEWPORT_HEIGHT / 2)
        });
      });
      
      it('should position the notification at the top center', () => {
        openAt({ x: 'center', y: 'top' });
        cy.get('.notyf__toast').then(button => {
          const { left, top } = button.position();
          expect(top).to.be.lessThan(VIEWPORT_HEIGHT / 2);
          expect(left).to.be.lessThan(VIEWPORT_WIDTH / 2);
          expect(left + button.width()).to.be.greaterThan(VIEWPORT_WIDTH / 2);
        });
      });
      
      it('should position the notification at the top right', () => {
        openAt({ x: 'right', y: 'top' });
        cy.get('.notyf__toast').then(button => {
          const { left, top } = button.position();
          expect(top).to.be.lessThan(VIEWPORT_HEIGHT / 2);
          expect(left).to.be.greaterThan(VIEWPORT_WIDTH / 2);
        });
      });
      
      it('should position the notification at the bottom left', () => {
        openAt({ x: 'left', y: 'bottom' });
        cy.get('.notyf__toast').then(button => {
          const { left, top } = button.position();
          expect(top).to.be.greaterThan(VIEWPORT_HEIGHT / 2);
          expect(left).to.be.lessThan(VIEWPORT_WIDTH / 2);
        });
      });
      
      it('should position the notification at the bottom center', () => {
        openAt({ x: 'center', y: 'bottom' });
        cy.get('.notyf__toast').then(button => {
          const { left, top } = button.position();
          expect(top).to.be.greaterThan(VIEWPORT_HEIGHT / 2);
          expect(left).to.be.lessThan(VIEWPORT_WIDTH / 2);
          expect(left + button.width()).to.be.greaterThan(VIEWPORT_WIDTH / 2);
        });
      });
      
      it('should position the notification at the bottom right', () => {
        openAt({ x: 'right', y: 'bottom' });
        cy.get('.notyf__toast').then(button => {
          const { left, top } = button.position();
          expect(top).to.be.greaterThan(VIEWPORT_HEIGHT / 2);
          expect(left).to.be.greaterThan(VIEWPORT_WIDTH / 2);
        });
      });
    });
  });

  describe('Registering new types', () => {
    beforeEach(() => {
      const config = {
        types: [
          {
            type: 'warning',
            backgroundColor: 'orange',
            className: 'custom-type-class',
            icon: {
              className: 'custom-icon',
            },
            ripple: false
          }
        ]
      };
      init(config);
      cy.get('#custom-id').type('warning');
    });

    it('should allow the creation of new types', () => {
      cy.get('#custom-btn').click();
      cy.get('.notyf__toast');
    });

    it('should render the new type with the custom class name', () => {
      cy.get('#custom-btn').click();
      cy.get('.notyf__toast').should('have.class', 'custom-type-class');
    });

    it('should render the new type with the custom icon', () => {
      cy.get('#custom-btn').click();
      cy.get('.notyf__icon')
        .find('i')
        .should('have.class', 'custom-icon')
        .then(([$elem]) => expect($elem.classList.length).to.equal(1));
    });

    it('should render the new type with the custom ripple setting', () => {
      cy.get('#custom-btn').click();
      cy.get('.notyf__ripple', { timeout: 10 }).should('not.exist');
    });

    it('should render the new type with the custom color', () => {
      cy.get('#custom-btn').click();
      cy.get('.notyf__toast').then(([elem]) => {
        expect(elem.style.backgroundColor).to.equal('orange');
      });
    })
  });

  describe('Overwriting configuration of existing types', () => {
    beforeEach(() => {
      const config = {
        types: [
          {
            type: 'error',
            backgroundColor: 'blue',
            icon: {
              className: 'custom-error-icon',
              tagName: 'span',
              text: 'fail icon'
            },
          }
        ]
      };
      init(config);
      cy.get('#custom-id').type('warning');
    });

    it('should apply the custom configuration to the existing type', () => {
      cy.get('#error-btn').click();
      cy.get('.notyf__ripple').then(([elem]) => {
        expect(elem.style.backgroundColor).to.equal('blue');
      });
      cy.get('.notyf__icon')
        .find('span')
        .should('have.class', 'custom-error-icon')
        .should('have.text', 'fail icon')
        .then(([$elem]) => expect($elem.classList.length).to.equal(1));
    });

    it('should keep some of the default configurations of the existing type', () => {
      cy.get('#error-btn').click();
      cy.get('.notyf__ripple', { timeout: 10 });
      cy.get('.notyf__toast').should('have.class', 'notyf__toast--error');
    });
  });

  describe('A11y', () => {
    beforeEach(() => init());

    it('should render the announcer', () => {
      cy.get('.notyf-announcer');
    });

    it('should announce the current notification', () => {
      const message = 'I love Notyf';
      cy.get('#message').type(message);
      cy.get('#error-btn').click();
      cy.get('.notyf-announcer').should('have.text', message);
    });
  });

  describe('Individual custom configuration', () => {
    beforeEach(() => init());

    it('should render with a custom message passed as a string', () => {
      const message = 'I love Notyf';
      cy.get('#message').type(message);
      cy.get('#error-btn').click();
      cy.get('.notyf__message').should('have.text', message);
    });

    it('should render with a custom message passed as a config object', () => {
      const message = 'I love Notyf';
      const config = { message };
      typeCode(config);
      cy.get('#error-btn').click();
      cy.get('.notyf__message').should('have.text', message);
    });

    it('should render html messages', () => {
      const message = '<p>My <b>html</b> <span class="foo">message</span></p>';
      const config = { message };
      typeCode(config);
      cy.get('#error-btn').click();
      cy.get('.notyf__message').find('p').find('span').should('have.class', 'foo');
    });

    it('should remove the notification after the given duration', () => {
      const duration = 3000;
      const config = { duration };
      typeCode(config);
      cy.get('#success-btn').click();
      cy.get('.notyf__toast', { timeout: 10 })
      cy.wait(duration + 1500); // we need to account roughly 1500ms for the css animations to finish
      cy.get('.notyf__toast').should('not.exist');
    });

    it('should render with custom class name', () => {
      const className = 'foo-bar-class';
      const config = { className };
      typeCode(config);
      cy.get('#success-btn').click();
      cy.get('.notyf__toast').should('have.class', className);
    });

    it('should render with multiple custom class names', () => {
      const className = 'foo-bar-class another-class';
      const config = { className };
      typeCode(config);
      cy.get('#success-btn').click();
      cy.get('.notyf__toast').should('have.class', className);
    });

    it('should paint the toast background when disabling the ripple', () => {
      const ripple = false;
      const backgroundColor = 'cyan';
      const config = { ripple, backgroundColor };
      typeCode(config);
      cy.get('#success-btn').click();
      cy.get('.notyf__ripple', { timeout: 10 }).should('not.exist');
      cy.get('.notyf__toast').then(([elem]) => {
        expect(elem.style.backgroundColor).to.equal(backgroundColor);
      });
    });

    it('should render the toast with custom background color', () => {
      const backgroundColor = 'cyan';
      const config = { backgroundColor };
      typeCode(config);
      cy.get('#success-btn').click();
      cy.get('.notyf__ripple').then(([elem]) => {
        expect(elem.style.backgroundColor).to.equal(backgroundColor);
      });
    });

    it('should render with a custom icon', () => {
      const className = 'foo-bar-icon';
      const tagName = 'span';
      const text = 'baz';
      const icon = { className, tagName, text };
      const config = { icon };
      typeCode(config);
      cy.get('#success-btn').click();
      cy.get('.notyf__icon')
        .find(tagName)
        .should('have.class', className)
        .should('have.text', text);
    });

  });
});
