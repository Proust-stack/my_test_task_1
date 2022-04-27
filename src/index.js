import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ApolloProvider>
);
