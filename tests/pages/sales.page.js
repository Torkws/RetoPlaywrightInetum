const { expect } = require('@playwright/test');

// Variables globales de tiempo de espera
const waitTimeInteraction = 2000;

class SalesPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
  }

  // Método para obtener el selector del botón "Add to cart" de un producto específico
  getAddToCartButton(productName) {
    // Buscar el contenedor del producto por su nombre y luego el botón
    return `//div[@class="inventory_item"][.//div[@class="inventory_item_name" and text()="${productName}"]]//button[contains(@id, "add-to-cart")]`;
  }

  // Método para obtener el selector del botón "Remove" de un producto específico
  getRemoveButton(productName) {
    return `//div[@class="inventory_item"][.//div[@class="inventory_item_name" and text()="${productName}"]]//button[contains(@id, "remove")]`;
  }

  async clickAddToCartForProduct(productName) {
    const addToCartButton = this.getAddToCartButton(productName);
    await this.page.locator(addToCartButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyCartBadgeCount(expectedCount) {
    const badge = this.page.locator(this.cartBadge);
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText(expectedCount);
  }

  async verifyRemoveButtonVisible(productName) {
    const removeButton = this.getRemoveButton(productName);
    await expect(this.page.locator(removeButton)).toBeVisible();
  }
}

module.exports = SalesPage;