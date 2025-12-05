
# Arquitectura del Framework de Testing - Playwright + Cucumber

## 📋 Descripción General

Reto Automatización QA – FrontEnd para postulación Inetum con framework de testing automatizado BDD para e-commerce de Sauce Demo, implementado con Playwright y Cucumber siguiendo el patrón Page Object Model (POM) - Steven Navarrete Quincho.

---

## 🏗️ Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CAPA DE FEATURES (BDD)                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  tests/features/                                                  │  │
│  │  ├── loginTest.feature          (Escenarios de login)             │  │
│  │  └── salesProductsTest.feature  (Escenarios de e-commerce)        │  │
│  │      • Gherkin en español                                         │  │
│  │      • Scenario / Scenario Outline                                │  │
│  │      • Tags: @testFront, @login, @saleProducts, @E01...           │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     CAPA DE STEP DEFINITIONS (Glue)                     │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  tests/steps/                                                     │  │
│  │  ├── login.steps.js          (Given/When/Then de login)           │  │
│  │  │   • Inicializa todas las pages en Background                   │  │
│  │  │   • Contexto compartido con 'this'                             │  │
│  │  ├── salesProducts.steps.js  (Steps de productos y carrito)       │  │
│  │  ├── shoppingCart.steps.js   (Steps de checkout y confirmación)   │  │
│  │  └── hooks.js                (Before/After/AfterStep hooks)       │  │
│  │      • AfterStep: Screenshots automáticos                         │  │
│  │      • After: Screenshots en fallos + limpieza ANSI               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    CAPA DE PAGE OBJECTS (POM Pattern)                   │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  tests/pages/                                                     │  │
│  │  ├── login.page.js           (Página de login)                    │  │
│  │  ├── sales.page.js           (Página de productos)                │  │
│  │  ├── shoppingCart.page.js    (Página del carrito)                 │  │
│  │  ├── checkoutUser.page.js    (Formulario de usuario - Step 1)     │  │
│  │  │   • Generación de datos mock con Faker.js                      │  │
│  │  └── checkoutOverview.page.js (Resumen del pedido - Step 2)       │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      CAPA DE UTILIDADES Y SOPORTE                       │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  tests/utils/                                                     │  │
│  │  └── browserManager.js       (Gestión del navegador)              │  │
│  │      • Soporte: chromium, firefox, webkit                         │  │
│  │                                                                   │  │
│  │  Librerías:                                                       │  │
│  │  • @faker-js/faker - Generación de datos mock                     │  │
│  │  • @playwright/test - Aserciones y locators                       │  │
│  │  • @cucumber/cucumber - Framework BDD                             │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          CAPA DE REPORTES                               │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  • cucumber-report.html   (Reporte HTML con screenshots)          │  │
│  │  • cucumber-report.json   (Datos estructurados del test)          │  │
│  │  • test-results/          (Screenshots y artefactos)              │  │
│  │  • playwright-report/     (Reporte de Playwright)                 │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Ejecución

```
1. Usuario ejecuta: npx cucumber-js --tags "@E01"
                           │
                           ▼
2. Cucumber lee:    loginTest.feature
                           │
                           ▼
3. Ejecuta Background:
   ├─ Lanza navegador (BrowserManager)
   ├─ Inicializa todas las Pages (LoginPage, SalesPage, etc.)
   └─ Navega a la página de login
                           │
                           ▼
4. Ejecuta Steps del Scenario:
   ├─ Given: login.steps.js → LoginPage.login()
   ├─ When: salesProducts.steps.js → SalesPage.clickAddToCart()
   └─ Then: salesProducts.steps.js → SalesPage.verifyCartBadgeCount()
                           │
                           ▼
5. AfterStep Hook (automático):
   └─ Captura screenshot si el step pasa
                           │
                           ▼
6. After Hook (al finalizar):
   ├─ Si falló: captura screenshot + limpia mensajes ANSI
   └─ Cierra el navegador
                           │
                           ▼
7. Genera Reportes:
   ├─ cucumber-report.html (con screenshots embebidos)
   └─ cucumber-report.json
```


---

## 🚀 Comandos de Ejecución

```bash
# Ejecutar todos los tests
npx cucumber-js

# Ejecutar por tags
npx cucumber-js --tags "@login"
npx cucumber-js --tags "@saleProducts and @E01"
npx cucumber-js --tags "@happyPath"
npx cucumber-js --tags "@unhappyPath"

# Ejecutar escenario específico
npx cucumber-js --tags "@E06"

# Ver reporte HTML
start cucumber-report.html
```


---

## 🎯 Patrones y Principios Implementados

### 1. **Page Object Model (POM)**
- Cada página web tiene su propia clase
- Encapsula selectores y acciones
- Facilita mantenimiento y reutilización

### 2. **Separación de Responsabilidades**

| Clase | Responsabilidad |
|-------|----------------|
| `LoginPage` | Autenticación y navegación inicial |
| `SalesPage` | Catálogo de productos y carrito |
| `ShoppingCartPage` | Visualización del carrito y confirmación final |
| `CheckoutUserPage` | Formulario de datos del usuario (step-one) |
| `CheckoutOverviewPage` | Resumen del pedido (step-two) |

### 3. **DRY (Don't Repeat Yourself)**
- `AfterStep` hook: Screenshots automáticos en cada step
- `generateMockData()`: Generación centralizada de datos con Faker
- Métodos reutilizables en Page Objects

### 4. **Data-Driven Testing**
- `Scenario Outline` con `Examples` para múltiples casos
- Parámetros dinámicos: `<firstName>`, `<lastName>`, etc.
- Soporte para valores "random" que generan datos con Faker

### 5. **Context Sharing**
- Uso de `this` en Cucumber para compartir instancias
- Todas las pages disponibles en cualquier step file
- Browser manager compartido entre steps

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Playwright** | ^1.57.0 | Automatización de navegadores |
| **Cucumber** | ^12.3.0 | Framework BDD con Gherkin |
| **Faker.js** | ^10.1.0 | Generación de datos mock |
| **Node.js** | - | Runtime de JavaScript |
| **TypeScript** | ^24.10.1 | Configuración (playwright.config.ts) |


---

## 📁 Estructura de Directorios

```
RetoPlaywrightInetum/
├── tests/
│   ├── features/              # Feature files en Gherkin
│   │   ├── loginTest.feature
│   │   └── salesProductsTest.feature
│   ├── pages/                 # Page Object Model
│   │   ├── login.page.js
│   │   ├── sales.page.js
│   │   ├── shoppingCart.page.js
│   │   ├── checkoutUser.page.js
│   │   └── checkoutOverview.page.js
│   ├── steps/                 # Step Definitions
│   │   ├── login.steps.js
│   │   ├── salesProducts.steps.js
│   │   ├── shoppingCart.steps.js
│   │   └── hooks.js
│   └── utils/                 # Utilidades
│       └── browserManager.js
├── cucumber.json              # Configuración de Cucumber
├── playwright.config.ts       # Configuración de Playwright
├── package.json               # Dependencias
├── cucumber-report.html       # Reporte HTML generado
├── cucumber-report.json       # Datos JSON del reporte
├── test-results/              # Screenshots y artefactos
└── playwright-report/         # Reporte de Playwright
```

---

## 📊 Características Clave

### ✅ Screenshots Automáticos
- **AfterStep**: Captura después de cada paso exitoso
- **After (en fallo)**: Captura cuando un test falla
- Embebidos automáticamente en `cucumber-report.html`

### ✅ Gestión de Datos Mock
- Faker.js integrado en `CheckoutUserPage`
- Soporte para palabra clave `"random"` en feature files
- Valores null/vacíos para validaciones de formularios

### ✅ Multi-navegador
- Chromium (por defecto)
- Firefox
- WebKit (Safari)

### ✅ Hooks Avanzados
- **AfterStep**: Screenshots automáticos
- **After**: Limpieza de códigos ANSI, screenshots de errores, cierre de navegador
- Logging detallado con emojis para debugging


---


**Creado por**: Steven Navarrete Quincho - Reto para Inetum  
**Última actualización**: Diciembre 2025  
**Framework**: Playwright + Cucumber + JavaScript
