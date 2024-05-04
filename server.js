const { ApolloServer, gql } = require('apollo-server');

// Массив пользователей (замените этим реальной базой данных)
let users = [];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    dummyQuery: String
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User!
  }
`;

const resolvers = {
  Query: {
    dummyQuery: () => "This is a dummy query"
  },
  Mutation: {
    registerUser: (_, { name, email, password }) => {
      // Проверяем, есть ли уже пользователь с таким email
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Создаем нового пользователя
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password // В реальной жизни пароль нужно хешировать перед сохранением
      };

      // Сохраняем пользователя
      users.push(newUser);

      return newUser;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
