import React from 'react'
import App from './App'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider as ClientApolloProvider } from '@apollo/client'
import {setContext,concat} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/',
  });
const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken')
    return{
        headers:{
            Authorization: token ? `Bearer ${token}`:''
        }
    }
})
const client = new ApolloClient({
    
    link:  authLink.concat(httpLink),
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