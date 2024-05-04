import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import RegistrationForm from './RegistrationForm';
import UsersList from './UsersList'; // Добавляем импорт компонента

ReactDOM.render(
  <ApolloProvider client={client}>
    <RegistrationForm />
    <UsersList /> {/* Добавляем компонент для отображения списка пользователей */}
  </ApolloProvider>,
  document.getElementById('root')
);
