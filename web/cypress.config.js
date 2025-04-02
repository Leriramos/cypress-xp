

const { defineConfig } = require("cypress");
const { configurePlugin } = require("cypress-mongodb"); // Alterado para require()


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    baseUrl: 'http://localhost:3000',
    env: {
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
