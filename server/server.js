const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// configure mySQL & GraphQL
const sequelize = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.Port || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
server.applyMiddleware({ app });

// Serve up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

// switch to the built react app when in production (this doesn't exist in dev)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// if hit backend server - sends to front end page.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// connect to the MySQL server and start the server
sequelize.sync({ force: false }).then(
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
);
