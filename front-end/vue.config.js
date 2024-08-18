const fs = require("fs");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync("ssl-cert/server.key"),
      cert: fs.readFileSync("ssl-cert/server.crt"),
    },
    port: 8081,
  },
});
