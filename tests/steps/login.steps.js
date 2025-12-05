const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const LoginPage = require('../pages/Login.page');
const SalesPage = require('../pages/sales.page');
const ShoppingCartPage = require('../pages/shoppingCart.page');
const BrowserManager = require('../utils/browserManager');

setDefaultTimeout(30000);

// Background
Given('que el usuario navega a la página de inicio de sesión de Sauce Demo', async function () {
  this.browserManager = new BrowserManager();
  this.page = await this.browserManager.launch();
  this.loginPage = new LoginPage(this.page);
  this.salesPage = new SalesPage(this.page);
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  
  await this.loginPage.navigate();
});

// When steps
When('el usuario ingresa el nombre de usuario {string}', async function (username) {
  await this.loginPage.enterUsername(username);
});

When('el usuario ingresa la contraseña {string}', async function (password) {
  await this.loginPage.enterPassword(password);
});

When('el usuario hace clic en el botón de inicio de sesión', async function () {
  await this.loginPage.clickLoginButton();
});

// Then steps
Then('el usuario debería ser redirigido a la página de productos', async function () {
  await this.loginPage.verifyRedirectToProducts();
});

Then('el inventario de productos debería ser visible', async function () {
  await this.loginPage.verifyInventoryVisible();
});

Then('debería mostrarse el mensaje de error {string}', async function (errorMessage) {
  await this.loginPage.verifyErrorMessage(errorMessage);
});

Then('el usuario debería permanecer en la página de inicio de sesión', async function () {
  await this.loginPage.verifyRemainsOnLoginPage();
});

// After hook to close browser
const { After } = require('@cucumber/cucumber');
After(async function () {
  if (this.browserManager) {
    await this.browserManager.close();
  }
});
