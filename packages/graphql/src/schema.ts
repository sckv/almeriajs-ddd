import './schema/Order';
import './schema/Product';
import './schema/Query';

import { schemaComposer } from 'graphql-compose';

export const schema = schemaComposer.buildSchema();
