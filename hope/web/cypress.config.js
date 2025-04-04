const { defineConfig } = require('cypress');
const { configurePlugin } = require('cypress-mongodb');
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config);
      configurePlugin(on);

      on('before:run', () => {
        cy.task('dropCollection', { collection: 'orphanages', failSilently: true });
      });

      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'http://localhost:3000',
    env: {
      allure: true,
      browserPermissions: {
        notifications: 'allow',
        geolocation: 'allow',
      },
      baseApi: 'http://localhost:3333',
      mongodb: {
        uri: 'mongodb+srv://qax:xperience@cluster0.n44xg.mongodb.net/HopeDB?retryWrites=true&w=majority&appName=Cluster0',
        database: 'HopeDB',
      },
    },
  },
});