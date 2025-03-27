const { defineConfig } = require("cypress");
const { configurePlugin } = require("cypress-mongodb"); // Alterado para require()


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    env: {
      browserPermissions: {
        notifications: 'allow',
        geolocation: 'allow'
      },

      mongodb: {
        uri: 'mongodb+srv://qax:xperience@cluster0.n44xg.mongodb.net/HopeDB?retryWrites=true&w=majority&appName=Cluster0',
        database: 'HopeDB'
        
      }
    }
  },
});
