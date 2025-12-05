const { expect } = require('@playwright/test');

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
    this.confirmationMessage = '[data-test="complete-header"]';
    this.confirmationIcon = '[data-test="pony-express"]';
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
