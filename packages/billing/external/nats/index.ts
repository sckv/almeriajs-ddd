import { connect, Payload } from 'ts-nats';

export const nats = connect({
  payload: Payload.JSON,
  url: process.env.NATS_URL,
}).then((client) => client);
// .catch((err) => console.error('NATS connection error', err));
