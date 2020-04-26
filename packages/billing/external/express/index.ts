import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import { Router } from 'express';

export const ex = Router();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('combined'));

// ROUTER
app.use(ex);

app.listen(3000, () => {
  console.log('Express server online!');
});
