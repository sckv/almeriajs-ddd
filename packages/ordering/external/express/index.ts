import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';

export const ex = express();

ex.use(bodyParser.json());
ex.use(bodyParser.urlencoded({ extended: true }));
ex.use(compression());
ex.use(morgan('combined'));

// ROUTER

ex.listen(3000, () => {
  console.log('Express server online!');
});
