Feature: Funcionalidad de Login para E-commerce de Sauce Demo
  
  Background:
    Given que el usuario navega a la página de inicio de sesión de Sauce Demo

  @testFront @login @E01 @happyPath
  Scenario: Inicio de sesión exitoso con credenciales válidas
    When el usuario ingresa el nombre de usuario "standard_user"
    And el usuario ingresa la contraseña "secret_sauce"
    And el usuario hace clic en el botón de inicio de sesión
    Then el usuario debería ser redirigido a la página de productos
    And el inventario de productos debería ser visible

  @testFront @login @E02 @unhappyPath
  Scenario: Fallo en inicio de sesión con credenciales inválidas
    When el usuario ingresa el nombre de usuario "invalid_user"
    And el usuario ingresa la contraseña "asdfasdfa213"
    And el usuario hace clic en el botón de inicio de sesión
    Then debería mostrarse el mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And el usuario debería permanecer en la página de inicio de sesión

  @testFront @login @E03 @unhappyPath
  Scenario: Fallo en inicio de sesión con usuario bloqueado
    When el usuario ingresa el nombre de usuario "locked_out_user"
    And el usuario ingresa la contraseña "secret_sauce"
    And el usuario hace clic en el botón de inicio de sesión
    Then debería mostrarse el mensaje de error "Epic sadface: Sorry, this user has been locked out."

