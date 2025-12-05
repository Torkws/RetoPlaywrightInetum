const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

// Variables globales de tiempo de espera
const waitTimeInteraction = 1000;

class CheckoutUserPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.cancelButton = '[data-test="cancel"]';
    this.errorMessage = '[data-test="error"]';
    this.checkoutInfoContainer = '[data-test="checkout-info-container"]';
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

  async verifyCheckoutPageDisplayed() {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    await expect(this.page.locator(this.checkoutInfoContainer)).toBeVisible();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async enterFirstName(firstName = null) {
    const finalFirstName = firstName || this.generateMockData('firstName');
    await this.page.locator(this.firstNameInput).fill(finalFirstName);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async enterLastName(lastName = null) {
    const finalLastName = lastName || this.generateMockData('lastName');
    await this.page.locator(this.lastNameInput).fill(finalLastName);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async enterPostalCode(postalCode = null) {
    const finalPostalCode = postalCode || this.generateMockData('postalCode');
    await this.page.locator(this.postalCodeInput).fill(finalPostalCode);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async enterCheckoutInformation(firstName = null, lastName = null, postalCode = null) {
    // Si no se proporcionan valores, generar datos mock
    const finalFirstName = firstName || this.generateMockData('firstName');
    const finalLastName = lastName || this.generateMockData('lastName');
    const finalPostalCode = postalCode || this.generateMockData('postalCode');

    await this.page.locator(this.firstNameInput).fill(finalFirstName);
    await this.page.locator(this.lastNameInput).fill(finalLastName);
    await this.page.locator(this.postalCodeInput).fill(finalPostalCode);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async enterCheckoutInformationFailure(firstName = null, lastName = null, postalCode = null) {
    const finalFirstName = firstName === 'random' ? this.generateMockData('firstName') : (firstName ?? '');
    const finalLastName = lastName === 'random' ? this.generateMockData('lastName') : (lastName ?? '');
    const finalPostalCode = postalCode === 'random' ? this.generateMockData('postalCode') : (postalCode ?? '');

    await this.page.locator(this.firstNameInput).fill(finalFirstName);
    await this.page.locator(this.lastNameInput).fill(finalLastName);
    await this.page.locator(this.postalCodeInput).fill(finalPostalCode);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clickContinueButton() {
    await this.page.locator(this.continueButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clickCancelButton() {
    await this.page.locator(this.cancelButton).click();
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyErrorMessage(expectedMessage) {
    const errorMsg = this.page.locator(this.errorMessage);
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(expectedMessage);
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyFirstNameFieldEmpty() {
    const value = await this.page.locator(this.firstNameInput).inputValue();
    expect(value).toBe('');
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyLastNameFieldEmpty() {
    const value = await this.page.locator(this.lastNameInput).inputValue();
    expect(value).toBe('');
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async verifyPostalCodeFieldEmpty() {
    const value = await this.page.locator(this.postalCodeInput).inputValue();
    expect(value).toBe('');
    await this.page.waitForTimeout(waitTimeInteraction);
  }

  async clearAllFields() {
    await this.page.locator(this.firstNameInput).clear();
    await this.page.locator(this.lastNameInput).clear();
    await this.page.locator(this.postalCodeInput).clear();
    await this.page.waitForTimeout(waitTimeInteraction);
  }
}

module.exports = CheckoutUserPage;
