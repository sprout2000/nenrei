import pjson from '../../package.json';

const calc = (y: number, m: number): number => {
  const birthday = y * 10000 + m * 100 + 1;
  const today = new Date();
  const target = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + 1;

  return Math.floor((target - birthday) / 10000);
};

describe('App component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Menu Button', () => {
    cy.get('[data-e2e="menu"]')
      .click()
      .get('[data-e2e="version"]')
      .should('have.text', pjson.version)
      .get('[data-e2e="version"]')
      .click()
      .get('[data-e2e="version"]')
      .should('be.visible', false);
  });

  it('QR Code', () => {
    cy.get('[data-e2e="menu"]')
      .click()
      .get('[data-e2e="share"]')
      .click()
      .get('[data-e2e="backdrop"]')
      .click()
      .get('[data-e2e="backdrop"]')
      .should('not.be.visible', true);
  });

  it('Selector', () => {
    cy.get('[data-e2e="year-selector"]')
      .click()
      .get('[data-e2e="year"]')
      .click()
      .get('[data-e2e="year"]')
      .should('have.text', '昭和46年 (1971)')
      .get('[data-e2e="month-selector"]')
      .click()
      .get('[data-e2e="month"]')
      .click()
      .get('[data-e2e="month"]')
      .should('have.text', '1月')
      .get('[data-e2e="age"]')
      .should('have.text', calc(1971, 3) as unknown as string)
      .get('[data-e2e="eto"]')
      .should('have.text', '辛亥（いのしし）');
  });
});
