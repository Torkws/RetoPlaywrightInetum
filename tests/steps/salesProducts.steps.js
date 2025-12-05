const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const SalesPage = require('../pages/sales.page');
const LoginPage = require('../pages/login.page');

setDefaultTimeout(30000);

let salesPage;
let page;
let loginPage;

// Login step
Given('el usuario {string} ha iniciado sesión correctamente con el pass {string}', async function (username, password) {
   if (!loginPage && this.page) {
    loginPage = new LoginPage(this.page);
}
    await loginPage.login(username, password)
});

// Sales steps
When('el usuario hace clic en el botón {string} para {string}', async function (buttonText, productName) {
  // Obtener la página del contexto compartido si existe
  if (!salesPage && this.page) {
    salesPage = new SalesPage(this.page);
  }
  await salesPage.clickAddToCartForProduct(productName);
});

Then('la insignia del carrito de compras debería mostrar {string}', async function (count) {
  await salesPage.verifyCartBadgeCount(count);
});

Then('el botón {string} debería ser visible para {string}', async function (buttonText, productName) {
  await salesPage.verifyRemoveButtonVisible(productName);
});