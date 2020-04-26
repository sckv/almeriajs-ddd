import './schema/Query';
import './schema/Mutation';

import { schemaComposer } from 'graphql-compose';

export const schema = schemaComposer.buildSchema();
