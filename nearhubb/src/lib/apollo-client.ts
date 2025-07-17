import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://nearhubb.suyasheditz.com/graphql', // अपने WP GraphQL endpoint से बदलना मत भूलना
  cache: new InMemoryCache(),
});

export default client;