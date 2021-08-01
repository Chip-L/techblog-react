const { User, Post, Comment } = require("../models");

const resolvers = {
  Query: async (parent, args) => {
    const getValue = [
      { id: 1, name: "User 1", password: "1234" },
      { id: 2, name: "User 2", password: "1234" },
    ];
    return getValue;
  },
};
