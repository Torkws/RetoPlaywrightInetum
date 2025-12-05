const { expect } = require('@playwright/test');

// Variables globales de tiempo de espera
const waitTimeInteraction = 1000;

class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.checkoutOverview = '[data-test="checkout-summary-container"]';
    this.finishButton = '[data-test="finish"]';
    this.cancelButton = '[data-test="cancel"]';
    this.cartItems = '[data-test="inventory-item"]';
    this.itemTotal = '[data-test="subtotal-label"]';
    this.taxLabel = '[data-test="tax-label"]';
    this.totalLabel = '[data-test="total-label"]';
    this.paymentInfo = '[data-test="payment-info-value"]';
    this.shippingInfo = '[data-test="shipping-info-value"]';
  }

  async verifyCheckoutOverviewPageDisplayed() {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
    await expect(this.page.locator(this.checkoutOverview)).toBeVisible();
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

  async clickCancelButton() {
    await this.page.locator(this.cancelButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyItemTotal(expectedTotal) {
    const itemTotal = this.page.locator(this.itemTotal);
    await expect(itemTotal).toBeVisible();
    await expect(itemTotal).toContainText(expectedTotal);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyTaxAmount(expectedTax) {
    const tax = this.page.locator(this.taxLabel);
    await expect(tax).toBeVisible();
    await expect(tax).toContainText(expectedTax);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyTotalAmount(expectedTotal) {
    const total = this.page.locator(this.totalLabel);
    await expect(total).toBeVisible();
    await expect(total).toContainText(expectedTotal);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyPaymentInformation() {
    await expect(this.page.locator(this.paymentInfo)).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyShippingInformation() {
    await expect(this.page.locator(this.shippingInfo)).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyProductInCheckout(productName) {
    const productItem = this.page.locator(`${this.cartItems}:has([data-test="inventory-item-name"]:has-text("${productName}"))`);
    await expect(productItem).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }
}

module.exports = CheckoutOverviewPage;
