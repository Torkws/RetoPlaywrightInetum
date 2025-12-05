const { expect } = require('@playwright/test');

// Variables globales de tiempo de espera
const waitTimeInteraction = 1000;

class SalesPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
  }

  // Método para obtener el selector del botón "Add to cart" de un producto específico
  getAddToCartOrRemoveButton(buttonText, productName) {
    return `[data-test="inventory-item-description"]:has([data-test="inventory-item-name"]:has-text("${productName}")) button:has-text("${buttonText}")`;
  }


  async clickAddToCartOrRemoveForProduct(buttonText,productName) {
    const addToCartOrRemoveButton = this.getAddToCartOrRemoveButton(buttonText,productName);
    await this.page.locator(addToCartOrRemoveButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyCartBadgeCount(expectedCount) {
    const badge = this.page.locator(this.cartBadge);
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText(expectedCount);
    await this.page.waitForTimeout(waitTimeInteraction);

  }

  async verifyRemoveButtonVisible(buttonText, productName) {
    const removeButton = this.getAddToCartOrRemoveButton(buttonText, productName);
    await expect(this.page.locator(removeButton)).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clickCartIcon() {
    await this.page.locator(this.cartIcon).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }
}

module.exports = SalesPage;