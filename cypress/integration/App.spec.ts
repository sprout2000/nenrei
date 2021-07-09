import pjson from '../../package.json';
import { calc, eto } from '../../src/components/App';

describe('年齢計算', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('レンダリングのみのテスト', () => {
    cy.get('body').contains('年齢計算');
  });

  it('生まれ年の選択', () => {
    cy.get('[data-e2e="year-selector"]')
      .click()
      .get('[data-value="1989"]')
      .click()
      .should('have.text', '平成元年 (1989)');
  });

  it('生まれ月の選択', () => {
    cy.get('[data-e2e="month-selector"]')
      .click()
      .get('[data-value="1"]')
      .click()
      .should('have.text', '1月');
  });

  it('年齢計算のテスト', () => {
    const age = calc(1989, 1);
    cy.get('[data-e2e="age"]').should('have.text', age);
  });

  it('干支算出のテスト', () => {
    const eAndTo = eto(1989);
    cy.get('[data-e2e="eto"]').should('have.text', eAndTo);
  });

  it('メニューボタンのテスト', () => {
    cy.get('[data-e2e="menu"]')
      .click()
      .get('[data-e2e="menu"]')
      .should('not.be.visible')
      .get('.MuiBackdrop-root')
      .should('be.visible')
      .get('[data-e2e="version"]')
      .click()
      .get('[data-e2e="menu"]')
      .should('be.visible');
  });

  it('バージョンのテスト', () => {
    cy.get('[data-e2e="menu"]')
      .click()
      .get('[data-e2e="version"]')
      .should('have.text', pjson.version)
      .click()
      .get('[data-e2e="menu"]')
      .should('be.visible');
  });

  it('共有メニューのテスト', () => {
    cy.get('[data-e2e="menu"]')
      .click()
      .get('[data-e2e="share"]')
      .contains('このアプリを共有')
      .click()
      .get('[data-e2e="backdrop"]')
      .click()
      .get('[data-e2e="menu"]')
      .should('be.visible');
  });

  it('レポジトリメニューのテスト', () => {
    cy.get('[data-e2e="menu"]')
      .click()
      .get('[data-e2e="repo"]')
      .contains('レポジトリ')
      .get('[data-e2e="version"]')
      .click()
      .get('[data-e2e="menu"]')
      .should('be.visible');
  });

  it('ライセンスメニューのテスト', () => {
    cy.get('[data-e2e="menu"]')
      .click()
      .get('[data-e2e="license"]')
      .contains('ライセンスの表示')
      .click()
      .get('[data-e2e="snack"]')
      .contains('sprout2000')
      .should('be.visible');
  });
});
