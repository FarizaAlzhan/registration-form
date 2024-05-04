import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import RegistrationForm from './RegistrationForm';

ReactDOM.render(
  <ApolloProvider client={client}>
    <RegistrationForm />
    
  </ApolloProvider>,
  document.getElementById('root')
);
