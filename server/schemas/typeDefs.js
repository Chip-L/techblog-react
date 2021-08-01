const { gql } = require("apollo-server-express");

typeDefs = gql`
    type User = {
        id: ID!
        name: Sting!
        password: String!
        created_at: String
        updated_at: String
    }

  type Query = {
      users = [User]
  }  
`;
