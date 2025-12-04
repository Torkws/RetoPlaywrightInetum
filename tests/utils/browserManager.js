const { chromium, firefox, webkit } = require('@playwright/test');

class BrowserManager {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async launch(browserType = 'chromium', options = {}) {
    const defaultOptions = {
      headless: false,
      ...options
    };

    switch (browserType.toLowerCase()) {
      case 'chromium':
        this.browser = await chromium.launch(defaultOptions);
        break;
      case 'firefox':
        this.browser = await firefox.launch(defaultOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(defaultOptions);
        break;
      default:
        throw new Error(`Navegador no soportado: ${browserType}`);
    }

    this.context = await this.browser.newContext();
    // Usar la primera página que el navegador crea automáticamente
    const pages = this.context.pages();
    if (pages.length > 0) {
      this.page = pages[0];
    } else {
      this.page = await this.context.newPage();
    }
    return this.page;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  getPage() {
    return this.page;
  }
}

module.exports = BrowserManager;