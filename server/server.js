const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// configure mySQL
const sequelize = require("./config/connection");

const PORT = process.env.Port || 3001;
const app = express();

// connect to the MySQL server and start the server
sequelize.sync({ force: false }).then(
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  })
);
