Feature: Funcionalidad E-commerce de Sauce Demo
  Como un cliente de Sauce Demo
  Quiero poder iniciar sesión, agregar productos al carrito And completar una compra
  Para poder adquirir los productos que necesito

  Background:
    Given que el usuario navega a la página de inicio de sesión de Sauce Demo

    @E01
  Scenario: Inicio de sesión exitoso con credenciales válidas
    When el usuario ingresa el nombre de usuario "standard_user"
    And el usuario ingresa la contraseña "secret_sauce"
    And el usuario hace clic en el botón de inicio de sesión
    Then el usuario debería ser redirigido a la página de productos
    And el inventario de productos debería ser visible


