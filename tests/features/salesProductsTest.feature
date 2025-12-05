Feature: Funcionalidad de Login para E-commerce de Sauce Demo
  
  Background:
    Given que el usuario navega a la página de inicio de sesión de Sauce Demo

  @testFront @saleProducts @E01
  Scenario: Inicio de sesión exitoso con credenciales válidas
    Given el usuario "standard_user" ha iniciado sesión correctamente con el pass "secret_sauce"
    Then el usuario debería ser redirigido a la página de productos
    And el inventario de productos debería ser visible
    When el usuario hace clic en el botón "Add to cart" para "Sauce Labs Backpack"
    Then la insignia del carrito de compras debería mostrar "1"
    And el botón "Remove" debería ser visible para "Sauce Labs Backpack"
