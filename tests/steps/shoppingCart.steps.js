const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30000);

// Shopping Cart steps
Then('debería mostrarse la página del carrito', async function () {
  await this.shoppingCartPage.verifyCartPageDisplayed();
});

Then('el producto {string} debería ser visible en el carrito', async function (productName) {
  await this.shoppingCartPage.verifyProductVisibleInCart(productName);
});

Then('la cantidad del producto debería ser {string}', async function (quantity) {
  await this.shoppingCartPage.verifyProductQuantity(quantity);
});

Then('el precio del producto debería mostrarse correctamente en formato $0.00', async function () {
  await this.shoppingCartPage.verifyProductPriceDisplayed();
});

Then('el usuario hace clic en el botón {string}', async function (buttonText) {
  const validButtons = ['Checkout', 'Continue', 'Finish'];
  
  if (!validButtons.includes(buttonText)) {
    throw new Error(`Botón inválido: "${buttonText}". Los botones válidos son: ${validButtons.join(', ')}`);
  }

  if (buttonText === 'Checkout') {
    await this.shoppingCartPage.clickCheckoutButton();
  } else if (buttonText === 'Continue') {
    await this.checkoutUserPage.clickContinueButton();
  } else if (buttonText === 'Finish') {
    await this.checkoutOverviewPage.clickFinishButton();
  }
});

Then('el usuario ingresa sus datos personales para la compra', async function () {
  await this.checkoutUserPage.enterCheckoutInformation();
});

Then('el usuario ingresa sus datos personales {string}, {string} y {string}', async function (firstName, lastName, postalCode) {
  await this.checkoutUserPage.enterCheckoutInformationFailure(firstName, lastName, postalCode);
});

Then('el usuario revisa la información del pedido', async function () {
  await this.checkoutOverviewPage.reviewOrderInformation();
});

Then('debería mostrarse el mensaje de confirmación {string}', async function (expectedMessage) {
  await this.shoppingCartPage.verifyConfirmationMessage(expectedMessage);
});

Then('el ícono de confirmación debería ser visible', async function () {
  await this.shoppingCartPage.verifyConfirmationIconVisible();
});

Then('debería mostrarse el mensaje de error en el formulario {string}', async function (expectedErrorMessage) {
  await this.checkoutUserPage.verifyErrorMessage(expectedErrorMessage);
});
