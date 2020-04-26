import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { dataSources } from './http';

const server = new ApolloServer({
  schema,
  dataSources,
  context: () => ({}),
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
