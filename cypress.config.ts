import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'http://localhost:4200',
    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/**/*.{e2e,cy}.{js,ts}',
    setupNodeEvents: (on, config) => {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    }
  }
});
