const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const LoginPage = require('../pages/Login.page');
const BrowserManager = require('../utils/browserManager');

let browser;
let page;
let loginPage;
let browserManager;

// Background
Given('que el usuario navega a la página de inicio de sesión de Sauce Demo', async function () {
  browserManager = new BrowserManager();
  page = await browserManager.launch();
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

// When steps
When('el usuario ingresa el nombre de usuario {string}', async function (username) {
  await loginPage.enterUsername(username);
});

When('el usuario ingresa la contraseña {string}', async function (password) {
  await loginPage.enterPassword(password);
});

When('el usuario hace clic en el botón de inicio de sesión', async function () {
  await loginPage.clickLoginButton();
});

// Then steps
Then('el usuario debería ser redirigido a la página de productos', async function () {
  await loginPage.verifyRedirectToProducts();
});

Then('el inventario de productos debería ser visible', async function () {
  await loginPage.verifyInventoryVisible();
});

Then('debería mostrarse el mensaje de error {string}', async function (errorMessage) {
  // TODO: Implementar verificación del mensaje de error
});

Then('el usuario debería permanecer en la página de inicio de sesión', async function () {
  // TODO: Implementar verificación de que el usuario permanece en login
});

// After hook to close browser
const { After } = require('@cucumber/cucumber');
After(async function () {
  if (browserManager) {
    await browserManager.close();
  }
});
