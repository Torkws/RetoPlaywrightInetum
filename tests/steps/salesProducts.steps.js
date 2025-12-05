const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30000);

// Login step
Given('el usuario {string} ha iniciado sesión correctamente con el pass {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});

// Sales steps
When('el usuario hace clic en el botón {string} para {string}', async function (buttonText, productName) {
  await this.salesPage.clickAddToCartOrRemoveForProduct(buttonText,productName);
});

When('el usuario agrega {string} al carrito', async function (productName) {
  await this.salesPage.clickAddToCartOrRemoveForProduct('Add to cart', productName);
});

When('el usuario hace clic en el ícono del carrito de compras', async function () {
  await this.salesPage.clickCartIcon();
});

Then('la insignia del carrito de compras debería mostrar {string}', async function (count) {
  await this.salesPage.verifyCartBadgeCount(count);
});

Then('el botón {string} debería ser visible para {string}', async function (buttonText, productName) {
  await this.salesPage.verifyRemoveButtonVisible(buttonText, productName);
});