const { expect } = require('@playwright/test');

// Variables globales de tiempo de espera
const waitTimeInteraction = 1000;

class SalesPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
    this.sortDropdown = '[data-test="product-sort-container"]';
    this.productNames = '[data-test="inventory-item-name"]';
    this.productPrices = '[data-test="inventory-item-price"]';
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

  async selectSortOption(sortOption) {
    await this.page.locator(this.sortDropdown).selectOption({ label: sortOption });
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyProductsSortedBy(criteria, order) {
    await this.page.waitForTimeout(1000); // Esperar a que se aplique el ordenamiento

    if (criteria === 'nombre') {
      const productNames = await this.page.locator(this.productNames).allTextContents();
      const sortedNames = [...productNames].sort();
      
      if (order === 'descendente') {
        sortedNames.reverse();
      }
      
      expect(productNames).toEqual(sortedNames);
    } else if (criteria === 'precio') {
      const productPriceTexts = await this.page.locator(this.productPrices).allTextContents();
      const productPrices = productPriceTexts.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...productPrices].sort((a, b) => a - b);
      
      if (order === 'descendente') {
        sortedPrices.reverse();
      }
      
      expect(productPrices).toEqual(sortedPrices);
    }
    
    await this.page.waitForTimeout(waitTimeInteraction);
  }
}

module.exports = SalesPage;