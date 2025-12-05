const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');

// Función para limpiar códigos ANSI de escape
function stripAnsiCodes(str) {
  if (!str) return str;
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
}

AfterStep(async function (testStepResult) {
  // Capturar screenshot solo si el step pasó y la página está disponible
  if (testStepResult.result.status === Status.PASSED && this.page && !this.page.isClosed()) {
    try {
      const screenshot = await this.page.screenshot({ 
        fullPage: true, 
        type: 'png',
        timeout: 5000
      });
      await this.attach(screenshot, 'image/png');
    } catch (error) {
      console.error(`⚠️ Error al capturar screenshot en step: ${error.message}`);
    }
  }
});

// After hook to capture screenshots on failure and close browser
After(async function (scenario) {
  console.log(`\n🔍 Hook After ejecutándose para: ${scenario.pickle.name}`);
  console.log(`📊 Estado del escenario: ${scenario.result.status}`);
  
  // Capturar screenshot si el escenario falló
  if (scenario.result.status === Status.FAILED) {
    console.log('⚠️ Escenario falló, intentando capturar screenshot...');
    
    // Limpiar mensaje de error de códigos ANSI
    if (scenario.result.message) {
      const cleanMessage = stripAnsiCodes(scenario.result.message);
      await this.attach(cleanMessage, 'text/plain');
    }
    
    try {
      // Verificar que page existe y no está cerrado
      if (this.page && typeof this.page.isClosed === 'function' && !this.page.isClosed()) {
        console.log('📸 Capturando screenshot...');
        
        // Esperar un momento para asegurar que la página esté estable
        await this.page.waitForTimeout(500);
        
        const screenshot = await this.page.screenshot({ 
          fullPage: true,
          type: 'png',
          timeout: 5000
        });
        
        // Adjuntar screenshot al reporte de Cucumber
        await this.attach(screenshot, 'image/png');
        
        console.log(`✅ Screenshot capturado y adjuntado exitosamente`);
      } else {
        console.log(`⚠️ No se pudo capturar screenshot: página no disponible o cerrada`);
        console.log(`   - this.page existe: ${!!this.page}`);
        console.log(`   - this.page.isClosed disponible: ${this.page && typeof this.page.isClosed === 'function'}`);
      }
    } catch (error) {
      console.error(`❌ Error al capturar screenshot: ${error.message}`);
      console.error(error.stack);
    }
  } else {
    console.log('✅ Escenario pasó correctamente');
  }
  
  // Cerrar el navegador
  if (this.browserManager) {
    try {
      await this.browserManager.close();
      console.log('🔒 Navegador cerrado correctamente');
    } catch (error) {
      console.error(`❌ Error al cerrar navegador: ${error.message}`);
    }
  }
});
