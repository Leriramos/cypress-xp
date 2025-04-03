

const { defineConfig } = require("cypress");
const { configurePlugin } = require("cypress-mongodb"); // Alterado para require()

const { configureAllureAdapterPlugins } = require ('@mmisty/cypress-allure-adapter/plugins');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config);
  
      configurePlugin(on);

      return config;
    },

    specPattern: [
      './cypress/support/hooks/index.cy.js',
      './cypress/e2e/**'
    ],
    baseUrl: 'http://localhost:3000',
    env: {
      allure: true,

      browserPermissions: {
        notifications: 'allow',
        geolocation: 'allow'
      },
      baseApi: 'http://localhost:3333',
      mongodb: {
        uri: 'mongodb+srv://qax:xperience@cluster0.n44xg.mongodb.net/HopeDB?retryWrites=true&w=majority&appName=Cluster0',
        database: 'HopeDB'
        
      }
    }
  },
});
