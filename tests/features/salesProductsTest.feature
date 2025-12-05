Feature: Funcionalidad de compra y gestión del carrito de productos en Sauce Demo

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

  @testFront @saleProducts @E05 @happyPath
  Scenario Outline: Verificar funcionalidad de ordenamiento de productos en el carrito de compras
    Given el usuario "standard_user" ha iniciado sesión correctamente con el pass "secret_sauce"
    And el usuario debería ser redirigido a la página de productos
    When el usuario selecciona la opción de ordenamiento "<opcionOrdenamiento>"
    Then los productos deberían estar ordenados por "<criterioOrdenamiento>" en orden "<tipoOrden>"

    Examples:
      | opcionOrdenamiento  | criterioOrdenamiento | tipoOrden   |
      | Name (A to Z)       | nombre               | ascendente  |
      | Name (Z to A)       | nombre               | descendente |
      | Price (low to high) | precio               | ascendente  |
      | Price (high to low) | precio               | descendente |

  @testFront @saleProducts @E06 @unhappyPath
  Scenario Outline: valida el llenado de datos personales en el checkout con diferentes conjuntos de datos fallidos
    Given el usuario "standard_user" ha iniciado sesión correctamente con el pass "secret_sauce"
    When el usuario completa el flujo hasta el checkout con "Sauce Labs Backpack"
    And el usuario ingresa sus datos personales "<firstName>", "<lastName>" y "<postalCode>"
    And el usuario hace clic en el botón "Continue"
    Then debería mostrarse el mensaje de error en el formulario "<messageErrorExpected>"

    Examples:
      | firstName | lastName | postalCode | messageErrorExpected           |
      |           | random   | random     | Error: First Name is required  |
      | random    |          | random     | Error: Last Name is required   |
      | random    | random   |            | Error: Postal Code is required |
