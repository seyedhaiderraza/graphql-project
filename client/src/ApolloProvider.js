import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider as ClientApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:5000/',
    cache: new InMemoryCache(),
    connectToDevTools: true
})

 function ApolloProvider() {
  return (
    <ClientApolloProvider client={client}>
        <App/>
    </ClientApolloProvider>
)
  }

  export default ApolloProvider