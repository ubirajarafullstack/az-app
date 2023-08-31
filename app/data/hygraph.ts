// graphql-client.ts
import { GraphQLClient } from 'graphql-request';

// Get the API endpoint and token from the environment variables
const HYGRAPH_API = process.env.NEXT_PUBLIC_HYGRAPH_API
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN

// Create a new GraphQL client with the endpoint and token
export const graphqlClient = new GraphQLClient(HYGRAPH_API!, {
  headers: {
    authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});
