import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider , createHttpLink} from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
console.log(authLink)

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

console.log(client)

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            exact path='/' 
            element={<SearchBooks />} 
            // element={<h3>hey bitch</h3>}
            />
          <Route 
            path='/saved'
            element={<SavedBooks />} 
          />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>          
      </>
    </Router>
    </ApolloProvider>
  
  );
}

export default App;
