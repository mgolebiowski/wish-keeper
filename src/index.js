"use strict";

require("dotenv").config();
const Hapi = require("@hapi/hapi");

const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0"
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {

  console.log(err);
  process.exit(1);
});

init();
