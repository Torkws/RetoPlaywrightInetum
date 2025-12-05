const { expect } = require('@playwright/test');

// Variables globales de tiempo de espera
const waitTimePage = 5000;
const waitTimeInteraction = 2000;

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.inventoryContainer = '[data-test="inventory-container"]';
    this.errorMessage = '[data-test="error"]';
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.waitForTimeout(waitTimePage);
  }

  async enterUsername(username) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async enterPassword(password) {
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyRedirectToProducts() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }

  async verifyInventoryVisible() {
    await expect(this.page.locator(this.inventoryContainer)).toBeVisible();
  }

  async verifyErrorMessage(expectedMessage) {
    const errorElement = this.page.locator(this.errorMessage);
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText(expectedMessage);
  }

  async verifyRemainsOnLoginPage() {
    await expect(this.page).toHaveURL(/.*saucedemo\.com\/?$/);
    await expect(this.page.locator(this.loginButton)).toBeVisible();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

module.exports = LoginPage;
