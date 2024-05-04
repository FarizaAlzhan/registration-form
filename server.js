const { ApolloServer, gql } = require('apollo-server');

// Здесь ваш массив пользователей (замените его на вашу реальную базу данных)
let users = [];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]! # Запрос для получения списка пользователей
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => users // Резолвер для запроса списка пользователей
  },
  Mutation: {
    registerUser: (_, { name, email, password }) => {
      // Проверка на существующего пользователя
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password 
      };

      // Сохранение нового пользователя
      users.push(newUser);

      return newUser;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
