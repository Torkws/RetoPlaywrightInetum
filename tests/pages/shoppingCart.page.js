const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

// Variables globales de tiempo de espera
const waitTimeInteraction = 1000;

class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.cartContainer = '[data-test="cart-contents-container"]';
    this.cartItem = '[data-test="inventory-item"]';
    this.cartItemName = '[data-test="inventory-item-name"]';
    this.cartItemQuantity = '[data-test="item-quantity"]';
    this.cartItemPrice = '[data-test="inventory-item-price"]';
    this.checkoutButton = '[data-test="checkout"]';
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.confirmationMessage = '[data-test="complete-header"]';
    this.confirmationIcon = '[data-test="pony-express"]';
    this.checkoutOverview = '[data-test="checkout-summary-container"]';
  }

  // Método para generar data mock usando Faker
  generateMockData(fieldType) {
    switch (fieldType.toLowerCase()) {
      case 'firstname':
        return faker.person.firstName();
      case 'lastname':
        return faker.person.lastName();
      case 'postalcode':
        return faker.location.zipCode();
      case 'email':
        return faker.internet.email();
      case 'phone':
        return faker.phone.number();
      case 'address':
        return faker.location.streetAddress();
      case 'city':
        return faker.location.city();
      default:
        return faker.string.alphanumeric(10);
    }
  }

  async verifyCartPageDisplayed() {
    await expect(this.page).toHaveURL(/.*cart.html/);
    await expect(this.page.locator(this.cartContainer)).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyProductVisibleInCart(productName) {
    const productItem = this.page.locator(`${this.cartItem}:has([data-test="inventory-item-name"]:has-text("${productName}"))`);
    await expect(productItem).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyProductQuantity(expectedQuantity) {
    const quantity = this.page.locator(this.cartItemQuantity).first();
    await expect(quantity).toHaveText(expectedQuantity);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyProductPriceDisplayed() {
    const price = this.page.locator(this.cartItemPrice).first();
    await expect(price).toBeVisible();
    // Verificar que el precio tenga el formato correcto ($XX.XX)
    await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clickCheckoutButton() {
    await this.page.locator(this.checkoutButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async enterPersonalInformation(firstName = null, lastName = null, postalCode = null) {
    // Si no se proporcionan valores, generar datos mock
    const finalFirstName = firstName || this.generateMockData('firstName');
    const finalLastName = lastName || this.generateMockData('lastName');
    const finalPostalCode = postalCode || this.generateMockData('postalCode');

    await this.page.locator(this.firstNameInput).fill(finalFirstName);
    await this.page.locator(this.lastNameInput).fill(finalLastName);
    await this.page.locator(this.postalCodeInput).fill(finalPostalCode);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clickContinueButton() {
    await this.page.locator(this.continueButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async reviewOrderInformation() {
    await expect(this.page.locator(this.checkoutOverview)).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clickFinishButton() {
    await this.page.locator(this.finishButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyConfirmationMessage(expectedMessage) {
    const message = this.page.locator(this.confirmationMessage);
    await expect(message).toBeVisible();
    await expect(message).toHaveText(expectedMessage);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyConfirmationIconVisible() {
    await expect(this.page.locator(this.confirmationIcon)).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }
}

module.exports = ShoppingCartPage;
