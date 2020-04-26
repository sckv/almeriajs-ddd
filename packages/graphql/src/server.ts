import { ApolloServer } from 'apollo-server';
import { schema } from './schema';

const server = new ApolloServer({ schema, context: () => ({}) });

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
