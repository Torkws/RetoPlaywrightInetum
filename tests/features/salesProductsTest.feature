Feature: Funcionalidad de Login para E-commerce de Sauce Demo
  
  Background:
    Given que el usuario navega a la página de inicio de sesión de Sauce Demo

  @testFront @saleProducts @E01 @happyPath
  Scenario: Se valida que el usuario pueda agregar productos al carrito de compras satisfactoriamente
    Given el usuario "standard_user" ha iniciado sesión correctamente con el pass "secret_sauce"
    And el usuario debería ser redirigido a la página de productos
    And el inventario de productos debería ser visible
    When el usuario hace clic en el botón "Add to cart" para "Sauce Labs Backpack"
    Then la insignia del carrito de compras debería mostrar "1"
    And el botón "Remove" debería ser visible para "Sauce Labs Backpack"


 @testFront @saleProducts @E02 @happyPath
 Scenario: Valida que el usuario pueda agregar múltiples productos al carrito satisfactoriamente
    Given el usuario "standard_user" ha iniciado sesión correctamente con el pass "secret_sauce"
    And el usuario debería ser redirigido a la página de productos
    When el usuario agrega "Sauce Labs Backpack" al carrito
    And el usuario agrega "Sauce Labs Bike Light" al carrito
    And el usuario agrega "Sauce Labs Bolt T-Shirt" al carrito
    Then la insignia del carrito de compras debería mostrar "3"


 @testFront @saleProducts @E03 @happyPath
  Scenario: Se valida que el usuario pueda visualizar correctamente los productos en el carrito de compras
    Given el usuario "standard_user" ha iniciado sesión correctamente con el pass "secret_sauce"
    And el usuario debería ser redirigido a la página de productos
    When el usuario agrega "Sauce Labs Backpack" al carrito
    And el usuario hace clic en el ícono del carrito de compras
    Then debería mostrarse la página del carrito
    And el producto "Sauce Labs Backpack" debería ser visible en el carrito
    And la cantidad del producto debería ser "1"
    And el precio del producto debería mostrarse correctamente en formato $0.00

 @testFront @saleProducts @E04 @happyPath
  Scenario: Completar proceso de compra exitosamente con inpus válidos
    Given el usuario "standard_user" ha iniciado sesión correctamente con el pass "secret_sauce"
    And el usuario debería ser redirigido a la página de productos
    And el usuario agrega "Sauce Labs Backpack" al carrito
    When el usuario hace clic en el ícono del carrito de compras
    And el usuario hace clic en el botón "Checkout"
    And el usuario ingresa sus datos personales para la compra 
    And el usuario hace clic en el botón "Continue"
    And el usuario revisa la información del pedido
    And el usuario hace clic en el botón "Finish"
    Then debería mostrarse el mensaje de confirmación "Thank you for your order!"
    And el ícono de confirmación debería ser visible